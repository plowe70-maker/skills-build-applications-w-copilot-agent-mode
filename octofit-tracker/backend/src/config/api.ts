export const apiPort = 8000;

export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-${apiPort}.app.github.dev`
  : `http://localhost:${apiPort}`;