// Central axios instance with base URL and interceptors
// Import the axios library for making HTTP requests
import axios from "axios";

// Create an axios instance with a base URL from environment variables
// The base URL is used as the default prefix for all API requests
const api = axios.create({
  // Set the base URL from the VITE_API_URL environment variable
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to automatically attach the JWT token to all requests
api.interceptors.request.use((config) => {
  // Retrieve the JWT token from browser's localStorage
  const token = localStorage.getItem("token");
  // Check if a token exists in localStorage
  if (token) {
    // If token exists, add it to the Authorization header with Bearer scheme
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Return the modified config object to continue the request
  return config;
});

export default api;
