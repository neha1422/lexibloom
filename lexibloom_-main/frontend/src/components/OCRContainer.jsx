import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRContainer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(URL.createObjectURL(file));
    setText("");
    setError("");
    setLoading(true);

    Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text.trim());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to extract text. Please try another image.");
        setLoading(false);
      });
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "extracted_text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="ocr-container">
      <h3>📷 Upload an Image to Extract Text</h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />

      {loading && <p className="processing">🕒 Processing image, please wait…</p>}
      {error && <p className="error">{error}</p>}

      {imageFile && (
        <div>
          <img src={imageFile} alt="Uploaded preview" />
        </div>
      )}

      {text && (
        <div className="extracted-text">
          <h4>📝 Extracted Text:</h4>
          <p>{text}</p>
          <button className="download-btn" onClick={downloadText}>
            ⬇️ Download Extracted Text
          </button>
        </div>
      )}
    </div>
  );
};

export default OCRContainer;

