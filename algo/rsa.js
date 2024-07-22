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
    const privateKey = key.privateKey;
    const buffer = Buffer.from(message);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return {
        "message": encrypted.toString('base64'),
        "publicKey": publicKey,
        "privateKey": privateKey
    };
}

const decrypt = async (message, privateKey) => {
    const buffer = Buffer.from(message, 'base64');
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            passphrase: 'top secret',
        },
        buffer
    );
    return {
        "message": decrypted.toString()
    };
}


module.exports = {
	encrypt ,
	decrypt
}