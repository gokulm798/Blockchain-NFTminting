const crypto = require('crypto');

// Encrypt function
async function encrypt(text, secretKey) {
  const cipher = await crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = await cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decrypt function
async function decrypt(encryptedText, secretKey) {
  const decipher =  await crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = await decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}



module.exports = {encrypt, decrypt};
