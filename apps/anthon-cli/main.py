import sounddevice as sd
from scipy.io.wavfile import write
import wavio as wv
from pydub import AudioSegment

import sys
import requests
import os

ANTHON_API_URL = "http://192.168.1.12:3000"

def send_mp3_file_and_transcribe(file_path, url):
    with open(file_path, 'rb') as file:
        files = {'file': file}
        response = requests.post(url, files=files)
        json = response.json()
        transcript = json['text']
        return transcript


def transcribe(): 
    if len(sys.argv) < 3:
        exit('Please specify a duration')
    
    duration = int(sys.argv[2])
    
    if duration == None:
        exit('Please specify a duration')
    
    freq = 44100
    recording = sd.rec(int(duration * freq), 
                    samplerate=freq, channels=1)
    
    print('Recording audio...')
    sd.wait()
    print('Recording complete, saving file')
    
    wv.write("output.wav", recording, freq, sampwidth=2)
    
    sound = AudioSegment.from_wav("output.wav")
    sound.export('output.mp3', format='mp3')
    
    url = ANTHON_API_URL + '/ai/transcribe'
    
    output = send_mp3_file_and_transcribe('output.mp3', url)
    print(output)
    
    # remove temp files
    os.remove('output.wav')
    os.remove('output.mp3')
    
def main():
    if len(sys.argv) < 2:
        exit('Please specify a command')
    
    command = sys.argv[1]
    
    if command == 'record':
        transcribe()
    else:
        print('Invalid command')
        exit()
 
    

if __name__ == "__main__":
    main()