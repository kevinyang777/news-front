import CryptoJS from 'crypto-js'

export const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key)
}

export const decryptToObject = (ciphertext, key) => {
  return JSON.parse(CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8))
}
