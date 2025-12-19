import React, { useState } from 'react';
import TextReader from './TextReader';


const UploadText = () => {
  const [lines, setLines] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result.split('\n').filter(line => line.trim() !== '');
        setLines(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div>
      {lines.length === 0 ? (
       <div className="upload-container">
  <label htmlFor="fileUpload">Upload a .txt file:</label>
  <input type="file" id="fileUpload" onChange={handleFileChange} />
</div>

      ) : (
        <TextReader lines={lines} />
      )}
    </div>
  );
};

export default UploadText;