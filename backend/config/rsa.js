const crypto = require('crypto');


async function generateRSAKey() {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({ publicKey, privateKey });
      }
    });
  });
}


async function encryptRSA(publicKey, plaintext) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(plaintext, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    resolve(encrypted.toString('base64'));
  });
}


async function decryptRSA(privateKey, ciphertext) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(ciphertext, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    resolve(decrypted.toString('utf8'));
  });
}

module.exports = {
    generateRSAKey,
    encryptRSA,
    decryptRSA,
  };
  