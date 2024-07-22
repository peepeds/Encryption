const crypto = require('crypto');

const encrypt = async (message) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { 
        iv: iv.toString('hex'), 
        encryptedData: encrypted.toString('hex'),
        key: key.toString('hex')
    };
}

const decrypt = async (encrypted, iv, key) => {
    const ivBuffer = Buffer.from(iv, 'hex');
    const keyBuffer = Buffer.from(key, 'hex'); 
    const encryptedText = Buffer.from(encrypted, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return {
        message: decrypted.toString()
    }
}

module.exports = {
    encrypt,
    decrypt
}
