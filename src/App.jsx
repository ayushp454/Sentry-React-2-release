import * as Sentry from "@sentry/react";
import './App.css'
import { useState } from "react";
import apiClient from "./utils";

function App() {
  const [state, setState] = useState({
    dogImgUrl: "",
  });

  const generateError = () => {
    throw new Error('Sentry - This is your sentry test error')
  }

  const getRandomDogImages = async () => {
    const response = await apiClient("https://dog.ceo/api/breeds/image/random");
    setState({
      dogImgUrl: response?.data?.message,
    })
  }

  const generateAPIError = async () => {
    try {
      const response = await apiClient("https://dog.ceo/api/breeds/image/randomee");
      setState({
        dogImgUrl: response?.data?.message,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const generateAPIError2 = async () => {
    try {
      const response = await apiClient("https://dog.ceo/api/breeds/image/randomex");
      setState({
        dogImgUrl: response?.data?.message,
      })
    } catch (error) {
      // throw new Error(error);
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
          Generate API Error
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
