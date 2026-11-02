import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    try {
      const session = JSON.parse(sessionStorage.getItem("meditrack.session"));
      if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;
    } catch {
      sessionStorage.removeItem("meditrack.session");
    }
  }
  return config;
});

export async function apiRequest(path, token, options = {}) {
  const url = path.replace(/^\/api(?=\/|$)/, "");
  const { body, method = "GET", ...config } = options;
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }

  try {
    const response = await api.request({ ...config, url, method, data: body });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      const abortError = new Error("Request was cancelled.");
      abortError.name = "AbortError";
      throw abortError;
    }
    throw new Error(error.response?.data?.message || error.message || "The request could not be completed.");
  }
}