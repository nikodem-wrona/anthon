from flask import Flask, jsonify, request
import whisper

model = whisper.load_model("tiny")

app = Flask(__name__)

def save_file(file):
    file.save("./data/audio.mp3")

@app.route('/transcribe', methods=['POST'])
def transcribe():
    audio_data = request.get_data()
    
    if not audio_data:
        return jsonify({"error": "No audio data in the request"}), 400

    with open("./data/audio.mp3", "wb") as audio_file:
        audio_file.write(audio_data)

    result = model.transcribe("./data/audio.mp3")
    text = result['text'].strip()

    return jsonify({ "text": text })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001, debug=False)