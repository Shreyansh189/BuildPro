import axios from "axios";

const TOKEN_KEY = "flipr_admin_token";

// Create axios instance with baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
