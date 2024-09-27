import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { authRouter } from './routes/auth.routes.js';
import { messageRoute } from './routes/message.routes.js';
import { userRoutes } from './routes/user.routes.js';

import connectToDB from './db/connectToDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',authRouter);
app.use("/api/message",messageRoute)
app.use('/api/users' , userRoutes)
app.get('/', function (req, res) {
    res.send('I love Nidhi Thakur ❤️');
});
app.listen(PORT,(req,res)=>{
    connectToDB();
    console.log('Server is running on port '+PORT);
})