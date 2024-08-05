const caesar = require('../models/algo/caesar')

exports.encrypt = async (req, res) => {
    const message = req.body.message;
    const shift = parseInt(req.body.shift);
    const result = await caesar.encrypt(message, shift);
    res.json(result);
};

exports.decrypt = async (req, res) => {
    const message = req.body.message;
    const shift = parseInt(req.body.shift);
    const result = await caesar.decrypt(message, shift);
    res.json(result);
};