const normalizedBaseUrl = (
  import.meta.env.VITE_BE_URL || "https://bamosbe-y6zz.onrender.com"
).replace(/\/+$/, "");

export const API_BASE_URL = normalizedBaseUrl;
export const LEGACY_API_BASE_URL = "https://bamosbe-production.up.railway.app";
