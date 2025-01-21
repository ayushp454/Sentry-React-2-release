# Create and Release Deployment Tutorial

- Clone this repo
- Make sure you also create a new sentry project sentry system and paste your configuration setting in main.jsx file
- Create a repo on github and upload your source code to github
- In sentry integrate the github and do configuration:
  select github project and assign current project to sentry created project.
- Add source map using below command
```bash
npx @sentry/wizard@latest -i sourcemaps
```

