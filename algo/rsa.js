const crypto = require('crypto');

const generateKey = async () => {
    return new Promise((resolve, reject) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 512,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret',
            },
        }, (err, publicKey, privateKey) => {
            if (err) reject(err);
            resolve({ privateKey, publicKey });
        });
    });
}

const encrypt = async (message) => {
    const key = await generateKey();
    const publicKey = key.publicKey;
    const buffer = Buffer.from(message);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return {
        "message": encrypted.toString('base64'),
        "publicKey": publicKey,
        "privateKey": key.privateKey
    };
}

const decrypt = async (encrypt, privateKey) => {
    try {
        const buffer = await Buffer.from(encrypt, 'base64');
        const decrypted = await crypto.privateDecrypt(
            {
                key: privateKey,
                passphrase: 'top secret',
            },
            buffer
        );
        return {
            "message": decrypted.toString()
        };
    } catch (error)
    {
        return {
            "message": "ERRRRORRRR BANH" 
        };
    }
}

module.exports = {
    encrypt,
    decrypt
}
