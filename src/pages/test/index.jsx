import React, { useState } from "react";
import Recorder from "audio-recorder-js";


let audioContext = null
let recorder = null



const AudioListen = () => {

  if (typeof window !== "undefined") {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    recorder = new Recorder(audioContext, {
      onAnalysed: (data) => console.log(data),
      numChannels: 2,
      sampleRate: 44100,
      sampleBits: 16,
      bufferLen: 4096,
      mimeType: "audio/wav",
    });
  }

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => recorder.init(stream))
      .catch(err => console.log('Uh oh... unable to get stream...', err));
      
    recorder.start().then(() => setIsRecording(true));
  };

  const stopRecording = () => {
    recorder.stop().then(({ blob, buffer }) => {
      setAudioBlob(blob);
      // buffer is an AudioBuffer
    });
  };

  const download = () => {
    Recorder.download(audioBlob, "my-audio-file");
  };

  const handleRecordButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <button onClick={handleRecordButtonClick}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioBlob && (
        <div>
          <button onClick={download}>Download Recording</button>
        </div>
      )}
    </div>
  );
};

export default AudioListen;
