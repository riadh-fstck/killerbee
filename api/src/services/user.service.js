import crypto from "crypto";
import cryptoJs from "crypto-js";
import fieldsToAnonymize from "../lib/fieldsToAnonymize.js";

const isValidPassword = (password) => {
    const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
    );
    return passwordRegex.test(password);
};

const generateEncryptionKey = () => {
    return crypto.randomBytes(32).toString("hex");
};

const anonymizeUserData = (user, encryptionKey) => {
    const anonymizedData = {};

    user = user.toJSON();
    for (const field in user) {
        if (fieldsToAnonymize.includes(field)) {
            const fieldValue = user[field];
            anonymizedData[field] = cryptoJs.AES.encrypt(
                fieldValue,
                encryptionKey
            ).toString();
        }
    }
    return anonymizedData;
};

const decryptUserData = (user, encryptionKey) => {
    const decryptedData = {};

    user = user.toJSON();
    for (const field in user) {
        if (fieldsToAnonymize.includes(field)) {
            const fieldValue = user[field];
            decryptedData[field] = cryptoJs.AES.decrypt(
                fieldValue,
                encryptionKey
            ).toString(cryptoJs.enc.Utf8);
        }
    }
    return decryptedData;
};

export {
    isValidPassword,
    anonymizeUserData,
    generateEncryptionKey,
    decryptUserData,
};
