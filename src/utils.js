import axios from "axios";
import * as Sentry from "@sentry/react";

const apiClient = axios.create();

apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    const apiUrl = error.config?.url || "Unknown URL";
    const apiMethod = error.config?.method?.toUpperCase() || "UNKNOWN METHOD";
    const status = error.response?.status || "Unknown Status";

    // Customize the error message
    const customMessage = `API Error: [${apiMethod}] ${apiUrl} returned status ${status}`;
    Sentry.captureException(new Error(customMessage), {
      tags: {
        type: "API ERROR",
        url: apiUrl,
        method: apiMethod,
        status: status,
      },
      extra: { // extra: it's used for pass extra detail about error message.
        data: error.response?.data, // pass error response data
      },
      fingerprint: [ // it will create a new issue based on url,method and status
        "{{ default }}", // Retain the default grouping
        error.config?.url, // Group by the API URL
        error.config?.method, // Group by the API method
        error.response?.status?.toString(), // Group by the status code
      ]
    }); // Log error to Sentry
    return Promise.reject(error); // Ensure promise rejection for further handling
  }
);

export default apiClient;