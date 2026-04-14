import * as crypto from 'node:crypto';
import CryptoJS from 'crypto-js';

export const providers = {
  nodeCrypto: {
    name: 'node:crypto',
    encrypt: (data: string, keyHex: string) => {
      const key = Buffer.from(keyHex, 'hex');
      const cipher = crypto.createCipheriv('des-ede3', key, null);
      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      return encrypted;
    },
    decrypt: (hexData: string, keyHex: string) => {
      const key = Buffer.from(keyHex, 'hex');
      const decipher = crypto.createDecipheriv('des-ede3', key, null);
      let decrypted = decipher.update(hexData, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
  },
  cryptoJS: {
    name: 'crypto-js',
    encrypt: (data: string, keyHex: string) => {
      const key = CryptoJS.enc.Hex.parse(keyHex);
      const encrypted = CryptoJS.TripleDES.encrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString();
    },
    decrypt: (hexData: string, keyHex: string) => {
      const key = CryptoJS.enc.Hex.parse(keyHex);
      const ciphertext = CryptoJS.enc.Hex.parse(hexData);
      const decrypted = CryptoJS.TripleDES.decrypt({ ciphertext } as any, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }
};