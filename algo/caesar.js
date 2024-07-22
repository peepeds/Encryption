const encrypt = async (message, shift) => {
    let result = '';
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (char.match(/[a-z]/i)) {
            let code = message.charCodeAt(i);
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
            } else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            }
        }
        result += char;
    }
    return  {result}
};

const decrypt = async (message, shift) => {
    return await encrypt(message, 26 - shift);
};

module.exports = {
    encrypt,
    decrypt
};

// Example usage
// let message = "Hello World";
// let shift = 5;
// encrypt(message, shift).then((result) => {
//     console.log("Encrypted:", result);
//     return decrypt(result, shift);
// }).then((decrypted) => {
//     console.log("Decrypted:", decrypted);
// }).catch((err) => {
//     console.error(err);
// });
