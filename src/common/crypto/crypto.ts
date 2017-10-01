import crypto from "crypto";
import keypair from "keypair";

/**
 * Use third party module to create public/private keypair,
 * as RSA key generation is not built-in to Node.
 */
export const createKeyPair = () => keypair({ bits: 2048 });

export const encrypt = (str, publicKey) => {
    const buffer = new Buffer(str);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

export const decrypt = (str, privateKey) => {
    const buffer = new Buffer(str, "base64");
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString("utf8");
};