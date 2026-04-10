const Symbols = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  0: 26,
  1: 27,
  2: 28,
  3: 29,
  4: 30,
  5: 31,
  6: 32,
  7: 33,
  8: 34,
  9: 35,
};
const reversedSymbols = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
  26: "0",
  27: "1",
  28: "2",
  29: "3",
  30: "4",
  31: "5",
  32: "6",
  33: "7",
  34: "8",
  35: "9",
};
const base = Object.keys(Symbols).length;

function generateKeys() {
  const key1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];
  const key2 = [1, 5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35];

  const key = [0, 0];

  key[0] = key1[Math.floor(Math.random() * key1.length)];
  key[1] = key2[Math.floor(Math.random() * key2.length)];

  return key;
}

function modInverse(a) {
  for (let x = 1; x < base; x++) {
    if ((a * x) % base == 1) {
      return x;
    }
  }
  return 1;
}

function encrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
  text = text.split(" ").join("");
  text = text.toUpperCase();
  let encryptedtext = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = Symbols[char];
    const encryptedCharCode = (charCode * keys[1] + keys[0]) % base;
    const encryptedChar = reversedSymbols[encryptedCharCode];
    encryptedtext += encryptedChar;
  }
  return encryptedtext;
}

function decrypt(text, keys) {
  if (text != null) {
    text = String(text);
  }
  text = text.split(" ").join("");
  text = text.toUpperCase();
  let decryptedtext = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charCode = Symbols[char];
    const decryptedCharCode =
      ((((charCode - keys[0]) * modInverse(keys[1])) % base) + base) % base;
    const decryptedChar = reversedSymbols[decryptedCharCode];
    decryptedtext += decryptedChar;
  }
  return decryptedtext;
}

module.exports = { encrypt, decrypt, generateKeys };
