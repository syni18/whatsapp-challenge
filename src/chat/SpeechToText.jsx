import React, {useEffect} from 'react'
import "./speech.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function SpeechToText() {
    const { transcript, resetTranscript } = useSpeechRecognition();

    useEffect(() => {
      SpeechRecognition.startListening({ continuous: true });
    }, []);
  return (
    <div>
      <form className="form_horizontal">
        <input type="text" placeholder="kuch ro fkvvdfdf" />
        <textarea value={transcript}></textarea>
      </form>
    </div>
  );
}

export default SpeechToText
