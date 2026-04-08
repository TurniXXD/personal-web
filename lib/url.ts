export const getDisplayHostname = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");
