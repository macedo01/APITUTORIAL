/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from "react";
import axios from "axios";
import "./index.css";

const mainFrame = () => {
  const apiKey = "8261b7bf49d04653a2478ed2ceee8c8d";
  const [name, setName] = useState();
  const [language_code, setLanguage_code] = useState();
  const [audio_url, setAudio_url] = useState();
  const [id, setId] = useState("");
  const [text, setText] = useState();
  const [status, setStatus] = useState("Put your url video to be transcripted");
  const [modal, setModal] = useState("panel");
  let bla;
  let testId;

  const addPost = async () => {
    const dataObject = {
      language_code: language_code,
      audio_url: audio_url,
    };

    await axios
      .post("https://api.assemblyai.com/v2/transcript", dataObject, {
        headers: { Authorization: apiKey },
      })
      .then((e) => {
        setStatus(e.data.status);
        testId = e.data.id;
        responseApi();
      })
      .catch(() => {
        throw new Error();
      });
  };

  const responseApi = async () => {
    await axios
      .get("https://api.assemblyai.com/v2/transcript/" + testId, {
        headers: {
          Authorization: apiKey,
        },
      })
      .then((e) => {
        setStatus(e.data.status);
        if (e.data.status === "processing" || e.data.status === "queued") {
          let bla = setTimeout(() => {
            responseApi();
            setStatus(e.data.status);
          }, 10000);
          setStatus(e.data.status);
        } else if (e.data.status === "completed") {
          clearTimeout(bla);
          setModal("panel active");
          setStatus(e.data.status);
          setText(e.data.text);
        }
      })
      .catch((e) => {
        throw new Error();
      });
  };

  const closeModal = () => {
    setName("");
    setAudio_url("");
    setStatus("Put your url video to be transcripted");
    setLanguage_code("none");
    setModal("panel");
  };

  return (
    <>
      <div className="all">
        {status}
        <div className={modal}>
          <div className="iconClose" onClick={closeModal}>
            X
          </div>
          <div className="name">{name} your transcript was completed</div>
          <div className="text">{text}</div>
        </div>
        <div className="separation">
          <label forHtml="inputName">Put your name: </label>
          <input
            type="text"
            id="inputName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="separation">
          <label forHtml="inputText">Choose the language of your audio: </label>
          <select
            value={language_code}
            required
            onChange={(e) => setLanguage_code(e.target.value)}
          >
            <option value="none" selected disabled>
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
          <input
            type="url"
            id="inputFile"
            value={audio_url}
            onChange={(e) => setAudio_url(e.target.value)}
          ></input>
        </div>

        <button type="submit" onClick={() => addPost()}>
          Get your Transcription
        </button>
      </div>
    </>
  );
};
export default mainFrame;
