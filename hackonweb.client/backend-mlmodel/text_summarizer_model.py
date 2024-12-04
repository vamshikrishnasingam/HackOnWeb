
from summarizer import Summarizer
def summarize_text(text):
    # Ensure the text is long enough for summarization
    if len(text) < 50:
        return text  # Return the original text if it's too short to summarize
    # Initialize BERT summarizer
    model = Summarizer()
    # Summarize text
    summary = model(text, num_sentences=10)
    print("Summary:", summary)
    return summary

    