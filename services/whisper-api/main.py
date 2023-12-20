from flask import Flask, jsonify, request
import whisper

model = whisper.load_model("tiny")

app = Flask(__name__)

def save_file(file):
    file.save("./data/audio.mp3")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file part in the request"}), 400
    
    file = request.files['audio']
        
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    save_file(file)

    result = model.transcribe("./data/audio.mp3")
    text = result['text'].strip()

    return jsonify({ "text": text })
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=False)