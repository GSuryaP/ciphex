function encrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
  let encryptedtext = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = char.charCodeAt(0);
    const encryptedCharCode = (charCode * keys[1] + keys[0]) % 26;
    if (encryptedCharCode < 0) {
      encryptedCharCode += 26;
    }
    const encryptedChar = String.fromCharCode(encryptedCharCode);
    encryptedtext += encryptedChar;
  }
  return encryptedtext;
}

function decrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
  let decryptedtext = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = char.charCodeAt(0);
    const decryptedCharCode = ((charCode - keys[0]) * modInverse(keys[1])) % 26;
    if (decryptedCharCode < 0) {
      decryptedCharCode += 26;
    }
    const decryptedChar = String.fromCharCode(decryptedCharCode);
    decryptedtext += decryptedChar;
  }
  return decryptedtext;
}

function generateKeys() {
  const key1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25,
  ];
  const key2 = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

  const key = [0, 0];

  key[0] = key1[Math.floor(Math.random() * key1.length)];
  key[1] = key2[Math.floor(Math.random() * key2.length)];

  return key;
}

module.exports = { encrypt, decrypt, generateKeys };
