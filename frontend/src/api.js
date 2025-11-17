import axios from "axios";

const TOKEN_KEY = "flipr_admin_token";

// Get base URL from environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Log the base URL (helps debug deployment issues)
// This will show in browser console to help diagnose connection issues
console.log("🌐 API Base URL configured:", baseURL);
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn("⚠️ VITE_API_BASE_URL not set! Using fallback:", baseURL);
  console.warn("⚠️ Set VITE_API_BASE_URL in Vercel Environment Variables");
}

// Create axios instance with baseURL
const api = axios.create({
  baseURL,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log full URL in development
    if (import.meta.env.DEV) {
      console.log("API Request:", config.method?.toUpperCase(), config.baseURL + config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // Server responded with error status
      console.error("API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("API Network Error:", {
        message: error.message,
        url: error.config?.baseURL + error.config?.url,
        code: error.code,
      });
    } else {
      // Something else happened
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = (data) => api.post("/auth/login", data);
export const fetchCurrentUser = () => api.get("/auth/me");

// Project APIs
export const getProjects = () => api.get("/projects");
export const createProject = (data) =>
  api.post(
    "/projects",
    data,
    data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined
  );

// Client APIs
export const getClients = () => api.get("/clients");
export const createClient = (data) =>
  api.post(
    "/clients",
    data,
    data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined
  );

// Contact APIs
export const getContacts = () => api.get("/contacts");
export const createContact = (data) => api.post("/contacts", data);

// Subscriber APIs
export const getSubscribers = () => api.get("/subscribers");
export const createSubscriber = (data) => api.post("/subscribers", data);

export default api;
export { TOKEN_KEY };
