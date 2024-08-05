const rsa = require('../models/algo/rsa');

exports.encrypt = async (req, res) => {
    const message = req.body.message;
    const result = await rsa.encrypt(message);
    res.send(result);
};

exports.decrypt = async (req, res) => {
    const encrypt = req.body.encrypt;
    const privateKey = req.body.privateKey;
    const result = await rsa.decrypt(encrypt,privateKey)
    res.send(result);
};