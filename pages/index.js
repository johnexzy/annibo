import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };

  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | By Afrodev</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate intuitive contents</h1>
          </div>
          <div className="header-subtitle">
            <h2>Your articles define you, Let's create magic with AI.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            value={userInput}
            onChange={onUserChangedText}
            placeholder="start typing here"
            className="prompt-box"
          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>
                  {isGenerating ? <span className="loader"></span> : "Generate"}
                </p>
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/johnexzy/annibo-chromium-extension/blob/master/dist/annibo-chromium-extension-master.zip?raw=true"
          target="_blank"
          download
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={Logo} alt="buildspace logo" />
            <p>Try the chrome Extension</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
