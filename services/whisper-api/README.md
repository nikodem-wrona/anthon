## Simple Flask api with deployed Whisper model

It's using `tiny` version of Whisper model.

it exposes following endpoints:

`[POST] /transcribe` - this endpoints accepts an audio file named "audio" in mp3 format and then is uses Whisper `.transcribe` method to convert it into string.

#

### References:

- [https://github.com/openai/whisper](https://github.com/openai/whisper)

- [https://openai.com/research/whisper](https://openai.com/research/whisper)
