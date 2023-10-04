import axios from "axios";


// Créez une instance Axios de base
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Remplacez par l'URL de votre API
});

// Ajoutez un intercepteur pour inclure le token dans chaque requête sortante
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;