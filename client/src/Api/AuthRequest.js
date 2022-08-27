import axios from 'axios';
const API =axios.create({baseURL:"http://localhost:5000"});

export const logIN=(formdata)=> API.post('/auth/login',formdata);
export const signUP=(formdata)=> API.post('/auth/register',formdata);