import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/Authroute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import CharRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
dotenv.config();
const app = express();

app.use(express.static('public'));
app.use("images", express.static("images"));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }).
then(() => app.listen(process.env.PORT, () => console.log(`listenting at ${process.env.PORT}`))).
catch((error) => {
    console.log(error.message);
})

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/chat', CharRoute);
app.use('/message', MessageRoute);
app.use('/upload', UploadRoute);