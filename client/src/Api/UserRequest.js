import axios from 'axios';
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getUser = (userId) => API.get(`/user/${userId}`);
export const userUpdate = (id, formdata) => API.put(`user/${id}`, formdata);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);

export const createChat = (receiverId, senderId) => API.post('/chat', {
    "senderId": senderId,
    "receiverId": receiverId
})