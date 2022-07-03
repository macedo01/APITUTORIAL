import React, { Fragment } from "react";
import axios from "axios";
import { useState } from "react";
import "./index.css";

const App = () => {
  const [name, setName] = useState();
  const [language_code, setLanguage_code] = useState();
  const [audio_url, setAudio_url] = useState();

  const addPost = () => {
    const data = {
      name: name,
      language_code: language_code,
      audio_url: audio_url,
    };

    axios
      .post("https://api.assemblyai.com/v2/transcript", data)
      .then(() => {
        console.log("Deu certinho");
      })
      .catch(() => {
        console.log("Deu erradinho");
      });
  };

  return (
    <>
      <div className="all">
        <div className="separation">
          <label forHtml="inputName">Put your name: </label>
          <input type="text" id="inputName"></input>
        </div>

        <div className="separation">
          <label forHtml="inputText">Choose the language of your audio: </label>
          <select required>
            <option selected disabled>
              Select
            </option>
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="it">Italian</option>
          </select>
        </div>

        <div className="separation">
          <label forHtml="inputFile">Select your file: </label>
          <input type="file" id="inputFile" accept="audio/*, video/*"></input>
        </div>

        <button type="submit" onClick={() => addPost}>
          Get your Transcription
        </button>
      </div>
    </>
  );
};

export default App;
