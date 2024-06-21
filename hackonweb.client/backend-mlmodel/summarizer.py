from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch

# Initialize the T5 model and tokenizer
model_name = "t5-base"  # Using a smaller model for faster processing
t5_model = T5ForConditionalGeneration.from_pretrained(model_name)
t5_tokenizer = T5Tokenizer.from_pretrained(model_name)

# If using a GPU, move the model to GPU and set to evaluation mode
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
t5_model = t5_model.to(device)
t5_model.eval()

def summarize_text(text):
    # Ensure the text is long enough for summarization
    if len(text) < 50:
        return text  # Return the original text if it's too short to summarize

    # Split the text into manageable chunks if it's too long
    max_chunk_length = 512
    chunks = [text[i:i+max_chunk_length] for i in range(0, len(text), max_chunk_length)]


    summarized_text = ""
    for chunk in chunks:
        inputs = t5_tokenizer.encode("summarize: " + chunk, return_tensors="pt", max_length=512, truncation=True).to(device)
        summary_ids = t5_model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=2, early_stopping=True)
        summarized_text += t5_tokenizer.decode(summary_ids[0], skip_special_tokens=True) + " "

    return summarized_text.strip()