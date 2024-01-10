import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER,
    headers: {
        "Content-Type": "application/json",
    },
    // timeout: 5000,
});

// instance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem("accessToken");
//         if (accessToken) {
//             config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
