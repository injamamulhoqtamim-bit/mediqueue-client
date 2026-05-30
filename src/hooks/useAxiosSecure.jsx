import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000' // Live server URL dynamic hobe deployment er por
});

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return axiosSecure;
};

export default useAxiosSecure;