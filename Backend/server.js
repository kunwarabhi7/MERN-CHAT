const express = require('express');

const app = express();

app.get('/', function (req, res) {
    res.send('I love Nidhi Thakur ❤️');
});

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})