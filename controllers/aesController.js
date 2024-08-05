const aes = require('../models/algo/aes')

exports.encrypt = async (req, res) => {
    const message = req.body.message;
    const result = await aes.encrypt(message);
    res.send(result);
};

exports.decrypt = async (req, res) => {
    const encrypted = req.body.encrypted;
    const iv = req.body.iv;
    const secret = req.body.secret;
    const result = await aes.decrypt(encrypted, iv, secret);
    res.send(result);
};