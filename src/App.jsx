import * as Sentry from "@sentry/react";
import './App.css'
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    dogImgUrl: "",
  });

  const generateError = () => {
    throw new Error('Sentry - This is your sentry test error')
  }

  const getRandomDogImages = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) {
      throw new Error('Failed to fetch dog image');
    }
    const json = await response.json();
    console.log(json)
    setState({
      dogImgUrl: json?.message,
    })
  }

  const generateAPIError = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/randomee");
    if (!response.ok) {
      // throw new Error('Failed to fetch dog image');
      Sentry.captureException(new Error("Failed to fetch dog image - Sentry capture Exception"));
    }
    const json = await response.json();
    console.log(json)
    setState({
      dogImgUrl: json?.message,
    })
  }

  const generateAPIError2 = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/randomee");
      const json = await response.json();
      console.log(json)
      setState({
        dogImgUrl: json?.message,
      })
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <h1>Create and Release Deployment Tutorial</h1>
      <div className="card">
        <button className="m-10" onClick={generateError}>
          Genereate an error
        </button>
        <button className="m-10" onClick={getRandomDogImages}>
          Generate Random Dog Image
        </button>
        <button className="m-10" onClick={generateAPIError}>
          Generate API Error - Capture Sentry exception
        </button>
        <button className="m-10" onClick={generateAPIError2}>
          Generate API Error <small>This will not sent error...</small>
        </button>
        {state.dogImgUrl && (
          <div className="img-container">
            <img src={state.dogImgUrl} alt="Random Dog image" />
          </div>
        )}
      </div>
    </>
  )
}

export default Sentry.withProfiler(App);
