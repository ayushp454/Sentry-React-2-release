import * as Sentry from "@sentry/react";
import './App.css'

function App() {

  const generateError = () => {
    throw new Error('Sentry - This is your sentry test error')
  }

  return (
    <>
      <h1>Create and Release Deployment Tutorial</h1>
      <div className="card">
        <button onClick={generateError}>
          Genereate an error
        </button>
      </div>
    </>
  )
}

export default Sentry.withProfiler(App);
