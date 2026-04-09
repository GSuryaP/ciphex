function encrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
}

function decrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
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
