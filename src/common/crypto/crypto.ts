import * as crypto from "crypto";

const algorithm = "AES-256-CTR"; // CBC because CTR isn't possible with the current version of the Node.JS crypto library
const hmacAlgorithm = "SHA256";

const getKey = (type: string) => {
  const getKey = decrypt(db.getCryptoKey(type));
  if (getKey) {
    return getKey;
  } else {
    const setKey = crypto.randomBytes(32);
    db.setCryptoKey(type, encrypt(setKey));
    return key;
  }
};

const key = getKey("key");
const HMAC_KEY = getKey("hmac");

const encrypt = plain_text => {
  const IV = new Buffer(crypto.randomBytes(16)); // ensure that the IV (initialization vector) is random
  const encryptor = crypto.createCipheriv(algorithm, key, IV);
  encryptor.setEncoding("hex");
  encryptor.write(plain_text);
  encryptor.end();

  const cipher_text = encryptor.read();

  const hmac = crypto.createHmac(hmacAlgorithm, HMAC_KEY);
  hmac.update(cipher_text);
  hmac.update(IV.toString("hex")); // ensure that both the IV and the cipher-text is protected by the HMAC

  // The IV isn't a secret so it can be stored along side everything else
  return cipher_text + "$" + IV.toString("hex") + "$" + hmac.digest("hex");
};

var decrypt = function(cipher_text) {
  const cipher_blob = cipher_text.split("$");
  const ct = cipher_blob[0];
  const IV = new Buffer(cipher_blob[1], "hex");
  const hmac = cipher_blob[2];

  const chmac = crypto.createHmac(hmacAlgorithm, HMAC_KEY);
  chmac.update(ct);
  chmac.update(IV.toString("hex"));

  if (!constant_time_compare(chmac.digest("hex"), hmac)) {
    console.log("Encrypted Blob has been tampered with...");
    return null;
  }

  const decryptor = crypto.createDecipheriv(algorithm, key, IV);
  const decryptedText = decryptor.update(ct, "hex", "utf-8");
  return decryptedText + decryptor.final("utf-8");
};

var constant_time_compare = function(val1, val2) {
  var sentinel;

  if (val1.length !== val2.length) {
    return false;
  }

  for (var i = 0; i <= val1.length - 1; i++) {
    sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
  }

  return sentinel === 0;
};

export { getKey, encrypt, decrypt };
