const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const config = require('./config');

require('dotenv').config();

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: path.resolve(__dirname, envFile) });

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/caesar/encrypt', config.caesarController.encrypt);
app.post('/caesar/decrypt', config.caesarController.decrypt);

app.post('/rsa/encrypt', config.rsaController.encrypt);
app.post('/rsa/decrypt', config.rsaController.decrypt);

app.post('/aes/encrypt', config.aesController.encrypt);
app.post('/aes/decrypt', config.aesController.decrypt);

// app.post('/aes/encrypt', async (req, res) => {
//     const message = req.body.message;
//     const result = await config.aes.encrypt(message);
//     res.send(result);
// })

// app.post('/aes/decrypt', async (req, res) => {
//     const encrypted = req.body.encrypted;
//     const iv = req.body.iv;
//     const secret = req.body.secret;
//     const result = await config.aes.decrypt(encrypted, iv, secret);
//     res.send(result);
// })

// app.post('/rsa/encrypt', async(req,res)=>{
//     const message = req.body.message;
//     const result = await config.rsa.encrypt(message);
//     res.send(result)
// })

// app.post('/rsa/decrypt', async(req,res)=>{
//     const encrypt = req.body.encrypt ; 
//     const privateKey = req.body.privateKey;
//     const result = await config.rsa.decrypt(encrypt,privateKey);
//     res.send(result);
// })

// app.post('/caesar/encrypt', async (req, res) => {;
//     const message = req.body.message;
//     const shift = parseInt(req.body.shift);
//     const result = await config.caesar.encrypt(message, shift);
   
//     res.json(result);
// });

// app.post('/caesar/decrypt', async (req, res) => {
//     const message = req.body.message;
//     const shift = req.body.shift;
//     const result = await config.caesar.decrypt(message, shift);
//     res.send(result);
// })
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/main.html');
})
app.get('/caesar', async (req, res) => {
    res.sendFile(__dirname + '/views/caesar.html');
});

app.get('/aes', async (req, res) => {
    res.sendFile(__dirname + '/views/aes.html');
});

app.get('/rsa', async (req, res) => {
    res.sendFile(__dirname + '/views/rsa.html');
});
app.use((req,res) =>{
    res.status(404).send("Page not found");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});