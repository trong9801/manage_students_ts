"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCodeStudents = void 0;
const lodash_1 = require("lodash");
const checkCodeStudents = (code) => {
    if (lodash_1.isEmpty(code)) {
        throw new Error('khong duoc bo trong ma hoc sinh');
    }
    const regex = /^(A|C)T+[0-9]{1,3}$/;
    if (!regex.test(code)) {
        throw new Error('nhap ma hoc sinh theo dang ATxxxxx hoac CTxxxx va co it nhat 5 chu so');
    }
};
exports.checkCodeStudents = checkCodeStudents;
