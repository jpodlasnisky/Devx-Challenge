import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
    baseURL: "http://localhost:3333/api/v1"
})

export default api;