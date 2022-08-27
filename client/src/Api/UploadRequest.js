import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const uploadImg = (data) => API.post("/upload", data);

export const uploadPosts = (data) => API.post("/post", data);