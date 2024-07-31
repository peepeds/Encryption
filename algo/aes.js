const crypto = require('crypto');

const encrypt = async (message) => {
    const algorithm = 'aes-256-cbc';
    const secret = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secret, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { 
        encryptedData: encrypted,
        iv: iv.toString('hex'), 
        secret: secret.toString('hex')
    };
}

const decrypt = async (encrypted, iv, key) => {
    const ivBuffer = Buffer.from(iv, 'hex');
    const keyBuffer = Buffer.from(key, 'hex'); 
    const encryptedText = Buffer.from(encrypted, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return {
        message: decrypted
    };
}

module.exports = {
    encrypt,
    decrypt
}
