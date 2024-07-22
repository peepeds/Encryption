const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
require('dotenv').config();
const port = process.env.PORT ;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/aes/encrypt', async (req, res) => {
    const message = req.body.message;
    const result = await config.aes.encrypt(message);
    res.send(result);
})

app.post('/aes/decrypt', async (req, res) => {
    const encrypted = req.body.encrypted;
    const iv = req.body.iv;
    const secret = req.body.secret;

    const result = await config.aes.decrypt(encrypted, iv, secret);
    res.send(result);
})

app.post('/rsa/encrypt', async(req,res)=>{
    const message = req.body.message;
    const result = await config.rsa.encrypt(message);
    res.send(result)
})

app.post('/rsa/decrypt', async(req,res)=>{
    const message = req.body.message ; 
    const privateKey = req.body.privateKey;
    const result = await config.rsa.decrypt(message,privateKey);
    res.send(result);
})

app.post('/caesar/encrypt', async (req, res) => {
    const message = req.body.message;
    const shift = req.body.shift;
    const result = await config.caesar.encrypt(message, shift);
    res.send(result);
});

app.post('/caesar/decrypt', async (req, res) => {
    const message = req.body.message;
    const shift = req.body.shift;
    const result = await config.caesar.decrypt(message, shift);
    res.send(result);
})

app.use((req,res) =>{
    res.status(404).send("Page not found");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });