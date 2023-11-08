// api.js (a separate module)
import axios from 'axios';

export const BaseURL = axios.create({
    baseURL: "http://localhost:3500/api/v1/",
    headers: {
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null
    }
})
