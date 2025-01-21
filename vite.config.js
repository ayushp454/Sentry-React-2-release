import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { environment, release } from "./src/main";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "learn-sentry-eh",
    project: "release-deployment",
    release: {
      name: "release-deom@1.0.0",
      deploy: {
        // env: environment,
        env: "staging",
      },
      create: true,
      finalize: true,
    },
    // authToken: process.env.SENTRY_AUTH_TOKEN
    authToken: "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",
  })],

  build: {
    sourcemap: true
  }
})