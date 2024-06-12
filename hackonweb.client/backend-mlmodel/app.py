import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from summarizer import summarize_text
from utils import allowed_file, extract_text_from_ppt

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'ppt', 'pptx'}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename, app.config['ALLOWED_EXTENSIONS']):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        text = extract_text_from_ppt(file_path)
        summary = summarize_text(text)
        
        return jsonify({"summary": summary})

    return jsonify({"error": "File not allowed"}), 400

@app.route('/summarize', methods=['POST'])
def summarize():
    ppt = request.json.get('ppt')
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], ppt)
    text = extract_text_from_ppt(file_path)
    summary = summarize_text(text)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)
