import express, {json, Router} from 'express';
import {config} from 'dotenv';
import {connect} from 'mongoose';
import photoRouter from './routes/photo.js';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from "cookie-parser";
import {decodeUser} from "./middlewares/auth/decodeUser.js";

const app = express()

config();

app.use(cookieParser());
app.use(decodeUser);
app.use(morgan("dev"))
app.use(json())
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL || "http://localhost:3000"}));
app.use(fileUpload({
   limits: {fileSize: 50 * 1024 * 1024},
}));
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT;

connect(process.env.DB).then(() => {
   app.listen(port, () => console.log(`Server running on port: ${port}`))
}).catch(e => {
   console.log(e);
});

app.use('/photo', photoRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.use((req, res) => {
   res.sendStatus(404);
})