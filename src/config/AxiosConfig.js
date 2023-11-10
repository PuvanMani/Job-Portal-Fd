// api.js (a separate module)
import axios from 'axios';

export const BaseURL = axios.create({
    baseURL: "http://192.168.1.16:3500/api/v1/",
    headers: {
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null
    }
})
