from transformers import BartTokenizer, BartForConditionalGeneration, Trainer, TrainingArguments
from datasets import load_dataset

# Load the dataset
dataset = load_dataset("cnn_dailymail", "3.0.0")

# Initialize the tokenizer and model
tokenizer = BartTokenizer.from_pretrained("facebook/bart-large")
model = BartForConditionalGeneration.from_pretrained("facebook/bart-large")

# Tokenization function
def tokenize_function(examples):
    inputs = examples["article"]
    targets = examples["highlights"]

    # Tokenize inputs
    inputs_tokenized = tokenizer(inputs, max_length=1024, truncation=True)

    # Tokenize targets
    with tokenizer.as_target_tokenizer():
        targets_tokenized = tokenizer(targets, max_length=128, truncation=True)

    # Prepare model inputs and labels
    model_inputs = {
        "input_ids": inputs_tokenized["input_ids"],
        "attention_mask": inputs_tokenized["attention_mask"],
        "decoder_input_ids": targets_tokenized["input_ids"],
        "labels": targets_tokenized["input_ids"],  # Labels are same as decoder_input_ids
    }
    return model_inputs

# Tokenize the dataset
tokenized_datasets = dataset.map(tokenize_function, batched=True)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=1,
    weight_decay=0.01,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
)

# Train the model
trainer.train()

# Save the model and tokenizer
model.save_pretrained("./custom_summarizer")
tokenizer.save_pretrained("./custom_summarizer")
