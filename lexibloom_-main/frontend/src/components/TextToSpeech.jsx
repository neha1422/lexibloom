



import React, { useState, useEffect, useRef } from "react";
import "../styles/features.css"; // Ensure this path is correct

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [fileText, setFileText] = useState("");


  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      if (allVoices.length > 0) setSelectedVoice(allVoices[0].name);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.type !== "text/plain") {
      alert("Only .txt files are supported for now.");
      return;
    }

    reader.onload = (event) => {
      setFileText(event.target.result);
      setText(""); // clear text area
    };

    reader.readAsText(file);
  };

  const speak = () => {
    const toSpeak = fileText.trim() || text.trim();
    if (!toSpeak) return;

    const utterance = new SpeechSynthesisUtterance(toSpeak);
    utterance.voice = voices.find((v) => v.name === selectedVoice);
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="tts-container">
      <h3>🎤 Enter Text or Upload File to Read Aloud</h3>

      <textarea
        rows="5"
        placeholder="Type or paste text here…"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setFileText(""); // clear file text
        }}
        aria-label="Text to speak"
      />

      <div>
        <strong>Or upload a text file: </strong>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          aria-label="Upload text file"
        />
      </div>

      <div className="tts-controls">
        <label>
          <strong>Voice:</strong>
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            aria-label="Select voice"
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </label>

        <label>
          <strong>Rate:</strong>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            aria-label="Speech rate"
          />
        </label>

        <label>
          <strong>Pitch:</strong>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            aria-label="Speech pitch"
          />
        </label>
      </div>

      <div className="tts-buttons">
        <button
          onClick={speak}
          disabled={speaking}
          className="play-btn"
          aria-label="Play speech"
        >
          ▶️ Play
        </button>
        <button
          onClick={stop}
          disabled={!speaking}
          className="stop-btn"
          aria-label="Stop speech"
        >
          ⏹ Stop
        </button>
      </div>

      <p className="tts-status">
        {speaking ? "Speaking…" : "Ready."}
      </p>
    </div>
  );
};


export default TextToSpeech;

