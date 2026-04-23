import axios from "axios";
import { API_BASE_URL, LEGACY_API_BASE_URL } from "./config/api";

axios.defaults.baseURL = API_BASE_URL;

const rewriteLegacyBackendUrl = (url) => {
  if (typeof url !== "string" || !url) {
    return url;
  }

  try {
    const parsedUrl = new URL(url, window.location.origin);
    const legacyOrigin = new URL(LEGACY_API_BASE_URL).origin;

    if (parsedUrl.origin !== legacyOrigin) {
      return url;
    }

    const rewrittenUrl = new URL(
      `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`,
      API_BASE_URL,
    );

    return rewrittenUrl.toString();
  } catch {
    return url;
  }
};

axios.interceptors.request.use((config) => {
  if (!config.url) {
    return config;
  }

  config.url = rewriteLegacyBackendUrl(config.url);

  return config;
});

if (typeof window !== "undefined") {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    if (typeof input === "string") {
      return originalFetch(rewriteLegacyBackendUrl(input), init);
    }

    return originalFetch(input, init);
  };

  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function patchedOpen(method, url, ...rest) {
    return originalOpen.call(this, method, rewriteLegacyBackendUrl(url), ...rest);
  };
}
