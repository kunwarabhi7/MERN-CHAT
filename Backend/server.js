import express from 'express';
import dotenv from 'dotenv';

import { authRouter } from './routes/auth.route.js';
import connectToDB from './db/connectToDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);

app.get('/', function (req, res) {
    res.send('I love Nidhi Thakur ❤️');
});
app.listen(PORT,(req,res)=>{
    connectToDB();
    console.log('Server is running on port '+PORT);
})