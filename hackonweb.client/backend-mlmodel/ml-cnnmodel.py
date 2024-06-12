#1.2 Import Required Modules
import torch
import torch.nn as nn
import torch.optim as optim
from torchtext.data.utils import get_tokenizer
from torchtext.vocab import build_vocab_from_iterator
from torch.utils.data import DataLoader, Dataset
import spacy
import random
import numpy as np
from datasets import load_dataset

# Set random seeds for reproducibility
SEED = 1234
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)
torch.cuda.manual_seed(SEED)
torch.backends.cudnn.deterministic = True

# Load English tokenizer from spacy
spacy_en = spacy.load('en_core_web_sm')

# Tokenizer function
def tokenize(text):
    return [tok.text for tok in spacy_en.tokenizer(text)]



#Step 2: Data Preprocessing
#2.1 Load the XSum Dataset
# Load the XSum dataset
dataset = load_dataset('xsum')



#2.2 Create Custom Dataset

class TextDataset(Dataset):
    def __init__(self, articles, summaries):
        self.articles = articles
        self.summaries = summaries

    def __len__(self):
        return len(self.articles)

    def __getitem__(self, idx):
        src = self.articles[idx]
        trg = self.summaries[idx]
        return src, trg

# Create datasets
train_data = TextDataset(dataset['train']['document'], dataset['train']['summary'])
valid_data = TextDataset(dataset['validation']['document'], dataset['validation']['summary'])
test_data = TextDataset(dataset['test']['document'], dataset['test']['summary'])



#2.3 Build Vocabulary
# Build vocabulary
def yield_tokens(data_iter, field):
    for src, trg in data_iter:
        yield tokenize(src) if field == 'article' else tokenize(trg)

SRC = build_vocab_from_iterator(yield_tokens(train_data, 'article'), specials=["<unk>", "<pad>", "<bos>", "<eos>"])
TRG = build_vocab_from_iterator(yield_tokens(train_data, 'summary'), specials=["<unk>", "<pad>", "<bos>", "<eos>"])

SRC.set_default_index(SRC["<unk>"])
TRG.set_default_index(TRG["<unk>"])

# Define constants
BATCH_SIZE = 32
PAD_IDX = SRC["<pad>"]

# Create iterators
def collate_batch(batch):
    src_batch, trg_batch = [], []
    for (src_item, trg_item) in batch:
        src_batch.append(torch.tensor([SRC["<bos>"]] + SRC(tokenize(src_item)) + [SRC["<eos>"]], dtype=torch.int64))
        trg_batch.append(torch.tensor([TRG["<bos>"]] + TRG(tokenize(trg_item)) + [TRG["<eos>"]], dtype=torch.int64))
    src_batch = nn.utils.rnn.pad_sequence(src_batch, padding_value=PAD_IDX)
    trg_batch = nn.utils.rnn.pad_sequence(trg_batch, padding_value=PAD_IDX)
    return src_batch, trg_batch

train_iter = DataLoader(train_data, batch_size=BATCH_SIZE, shuffle=True, collate_fn=collate_batch)
valid_iter = DataLoader(valid_data, batch_size=BATCH_SIZE, shuffle=False, collate_fn=collate_batch)
test_iter = DataLoader(test_data, batch_size=BATCH_SIZE, shuffle=False, collate_fn=collate_batch)




#Step 3: Model Setup
#3.1 Define Encoder and Decoder

class Encoder(nn.Module):
    def __init__(self, input_dim, emb_dim, hid_dim, n_layers, dropout):
        super().__init__()
        self.embedding = nn.Embedding(input_dim, emb_dim)
        self.rnn = nn.LSTM(emb_dim, hid_dim, n_layers, dropout=dropout)
        self.dropout = nn.Dropout(dropout)

    def forward(self, src):
        embedded = self.dropout(self.embedding(src))
        outputs, (hidden, cell) = self.rnn(embedded)
        return hidden, cell

class Decoder(nn.Module):
    def __init__(self, output_dim, emb_dim, hid_dim, n_layers, dropout):
        super().__init__()
        self.output_dim = output_dim
        self.embedding = nn.Embedding(output_dim, emb_dim)
        self.rnn = nn.LSTM(emb_dim, hid_dim, n_layers, dropout=dropout)
        self.fc_out = nn.Linear(hid_dim, output_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, input, hidden, cell):
        input = input.unsqueeze(0)
        embedded = self.dropout(self.embedding(input))
        output, (hidden, cell) = self.rnn(embedded, (hidden, cell))
        prediction = self.fc_out(output.squeeze(0))
        return prediction, hidden, cell



#3.2 Define Seq2Seq Model
class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder, device):
        super().__init__()
        self.encoder = encoder
        self.decoder = decoder
        self.device = device

    def forward(self, src, trg, teacher_forcing_ratio=0.5):
        trg_len = trg.shape[0]
        batch_size = trg.shape[1]
        trg_vocab_size = self.decoder.output_dim

        outputs = torch.zeros(trg_len, batch_size, trg_vocab_size).to(self.device)

        hidden, cell = self.encoder(src)

        input = trg[0, :]

        for t in range(1, trg_len):
            output, hidden, cell = self.decoder(input, hidden, cell)
            outputs[t] = output
            top1 = output.argmax(1)
            input = trg[t] if random.random() < teacher_forcing_ratio else top1

        return outputs



#Step 4: Training the Model
#4.1 Initialize Model, Optimizer, and Loss Function

INPUT_DIM = len(SRC)
OUTPUT_DIM = len(TRG)
ENC_EMB_DIM = 256
DEC_EMB_DIM = 256
HID_DIM = 512
N_LAYERS = 2
ENC_DROPOUT = 0.5
DEC_DROPOUT = 0.5

enc = Encoder(INPUT_DIM, ENC_EMB_DIM, HID_DIM, N_LAYERS, ENC_DROPOUT)
dec = Decoder(OUTPUT_DIM, DEC_EMB_DIM, HID_DIM, N_LAYERS, DEC_DROPOUT)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = Seq2Seq(enc, dec, device).to(device)

optimizer = optim.Adam(model.parameters())
criterion = nn.CrossEntropyLoss(ignore_index=PAD_IDX)


#cd 4.2 Training Loop

def train(model, iterator, optimizer, criterion, clip):
    model.train()
    epoch_loss = 0

    for i, (src, trg) in enumerate(iterator):
        src = src.to(device)
        trg = trg.to(device)

        optimizer.zero_grad()
        output = model(src, trg)

        output_dim = output.shape[-1]
        output = output[1:].view(-1, output_dim)
        trg = trg[1:].view(-1)

        loss = criterion(output, trg)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), clip)
        optimizer.step()

        epoch_loss += loss.item()

    return epoch_loss / len(iterator)


#4.3 Evaluation Loop
def evaluate(model, iterator, criterion):
    model.eval()
    epoch_loss = 0

    with torch.no_grad():
        for i, (src, trg) in enumerate(iterator):
            src = src.to(device)
            trg = trg.to(device)

            output = model(src, trg, 0)
            output_dim = output.shape[-1]
            output = output[1:].view(-1, output_dim)
            trg = trg[1:].view(-1)

            loss = criterion(output, trg)
            epoch_loss += loss.item()

    return epoch_loss / len(iterator)

#4.4 Training the Model
N_EPOCHS = 10
CLIP = 1

for epoch in range(N_EPOCHS):
    train_loss = train(model, train_iter, optimizer, criterion, CLIP)
    valid_loss = evaluate(model, valid_iter, criterion)
    print(f'Epoch: {epoch+1:02}')
    print(f'\tTrain Loss: {train_loss:.3f}')
    print(f'\t Val. Loss: {valid_loss:.3f}')




#Step 5: Inference
#5.1 Generate Summaries and Saving the model
def generate_summary(model, sentence, src_field, trg_field, max_len=50):
    model.eval()
    tokens = [token.text.lower() for token in spacy_en(sentence)]
    tokens = [src_field.get_stoi()["<bos>"]] + [src_field.get_stoi()[token] for token in tokens] + [src_field.get_stoi()["<eos>"]]
    src_tensor = torch.LongTensor(tokens).unsqueeze(1).to(device)

    with torch.no_grad():
        hidden, cell = model.encoder(src_tensor)

    trg_indexes = [trg_field.get_stoi()["<bos>"]]

    for i in range(max_len):
        trg_tensor = torch.LongTensor([trg_indexes[-1]]).to(device)

        with torch.no_grad():
            output, hidden, cell = model.decoder(trg_tensor, hidden, cell)

        pred_token = output.argmax(1).item()
        trg_indexes.append(pred_token)

        if pred_token == trg_field.get_stoi()["<eos>"]:
            break

    trg_tokens = [trg_field.get_itos()[i] for i in trg_indexes]

    return ' '.join(trg_tokens[1:-1])

# Save the trained model
torch.save(model.state_dict(), 'seq2seq_model.pt')
print("Model saved!")

#5.2 Loading the Model
# Define the model architecture again (when loading the model)
enc = Encoder(INPUT_DIM, ENC_EMB_DIM, HID_DIM, N_LAYERS, ENC_DROPOUT)
dec = Decoder(OUTPUT_DIM, DEC_EMB_DIM, HID_DIM, N_LAYERS, DEC_DROPOUT)
model = Seq2Seq(enc, dec, device).to(device)

# Load the model parameters
model.load_state_dict(torch.load('seq2seq_model.pt'))
print("Model loaded!")

# Example usage: Generate a summary from a new input
sentence = input()
summary = generate_summary(model, sentence, SRC, TRG)
print(summary)