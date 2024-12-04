import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import easyocr
import cv2
import numpy as np
from difflib import SequenceMatcher
from model_text_summarizer import summarize_text
from utils import allowed_file, extract_text_from_ppt

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folders and allowed extensions
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'ppt', 'pptx'}
app.config['IMAGE_FOLDER'] = 'uploads/images'
os.makedirs(app.config['IMAGE_FOLDER'], exist_ok=True)

# Allowed image extensions
app.config['ALLOWED_IMAGE_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}

# Initialize EasyOCR Reader
reader = easyocr.Reader(['en'])  # Specify the languages you want to support

# Utility function to check allowed file extensions
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if allowed_file(file.filename, app.config['ALLOWED_EXTENSIONS']):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract text and summarize
        text = extract_text_from_ppt(file_path)
        summary = summarize_text(text)

        return jsonify({"summary": summary})

    return jsonify({"error": "File not allowed"}), 400

@app.route('/summarize', methods=['POST'])
def summarize():
    ppt = request.json.get('ppt')
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], ppt)
    if not os.path.exists(file_path):
        return jsonify({"error": "File not found"}), 404
    
    text = extract_text_from_ppt(file_path)
    summary = summarize_text(text)
    print(summary)
    return jsonify({"summary": summary})

@app.route('/extract-text', methods=['POST'])
def extract_text():
    # Function to calculate character-level accuracy
    def calculate_accuracy(extracted_text, ground_truth):
        matcher = SequenceMatcher(None, extracted_text, ground_truth)
        return matcher.ratio() * 100  # Returns accuracy as a percentarge

    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the uploaded file
    image_name = secure_filename(image.filename)
    image_path = os.path.join(app.config['IMAGE_FOLDER'], image_name)
    image.save(image_path)

    # Use EasyOCR to extract text
    try:
        # Read the image
        image = cv2.imread(image_path)
        result = reader.readtext(image)

        # Join the text results line by line
        extracted_text = "\n".join([text[1] for text in result])

        # Calculate accuracy
        ground_truth = request.form.get('groundTruth')
        accuracy = calculate_accuracy(extracted_text, ground_truth) if ground_truth else None

        return jsonify({'extractedText': extracted_text, 'accuracy': accuracy}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        # Clean up: remove the uploaded file
        if os.path.exists(image_path):
            os.remove(image_path)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
