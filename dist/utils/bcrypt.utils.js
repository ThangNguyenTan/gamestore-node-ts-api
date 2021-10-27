"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcrypt_1 = require("bcrypt");
const encrypt = (plainString) => {
    return bcrypt_1.hashSync(plainString, 10);
};
exports.encrypt = encrypt;
const compare = (plainString, hashString) => {
    return bcrypt_1.compareSync(plainString, hashString);
};
exports.compare = compare;
