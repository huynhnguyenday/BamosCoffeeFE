import { API_BASE_URL, LEGACY_API_BASE_URL } from "../config/api";

export const resolveMediaUrl = (url) => {
  if (!url || typeof url !== "string") {
    return "";
  }

  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return "";
  }

  // Keep data/blob URLs untouched.
  if (trimmedUrl.startsWith("data:") || trimmedUrl.startsWith("blob:")) {
    return trimmedUrl;
  }

  // Build absolute URL for relative file paths from backend.
  if (trimmedUrl.startsWith("/")) {
    return `${API_BASE_URL}${trimmedUrl}`;
  }

  // Map old backend domain to current backend domain.
  if (trimmedUrl.startsWith(LEGACY_API_BASE_URL)) {
    return trimmedUrl.replace(LEGACY_API_BASE_URL, API_BASE_URL);
  }

  return trimmedUrl;
};
