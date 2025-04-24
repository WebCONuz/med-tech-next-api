import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.berlinmed-export.com",
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("dmin_uth");
      localStorage.removeItem("access_token");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
