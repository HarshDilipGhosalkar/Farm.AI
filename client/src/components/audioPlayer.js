import React, { useState, useEffect, use } from 'react';

const AudioPlayer = ({ audioData, setAudioData }) => {
  const [audioBlob, setAudioBlob] = useState(null);

  useEffect(() => {
    if (audioData) {
      // Decode base64 string to a Blob object
      const byteString = atob(audioData);
      const mimeType = 'audio/mpeg'; // Assuming audio format is MP3
      const buffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(buffer);
      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([buffer], { type: mimeType });
      setAudioBlob(blob);
    }
  }, [audioData]);

  const handlePlay = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
      console.log('Playing audio...');
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>Play Audio</button>
    </div>
  );
};

export default AudioPlayer;
