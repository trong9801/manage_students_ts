"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExist = void 0;
const students_1 = __importDefault(require("../module/students"));
const class_1 = __importDefault(require("../module/class"));
const checkExist = (DB, propertyValue, boolean) => __awaiter(void 0, void 0, void 0, function* () {
    let a = [];
    if (DB == 'student') {
        const findStudent = yield students_1.default.findOne({ codeStudents: propertyValue });
        a.push(findStudent === null || findStudent === void 0 ? void 0 : findStudent._id);
    }
    if (DB == 'class') {
        const findclass = yield class_1.default.findOne({ name: propertyValue });
        a.push(findclass === null || findclass === void 0 ? void 0 : findclass._id);
    }
    if (boolean) {
        if (a[0]) {
            throw new Error(`alo ${DB} lop da ton tai`);
        }
    }
    else {
        if (!a[0]) {
            throw new Error(`${DB} khong ton tai`);
        }
    }
});
exports.checkExist = checkExist;
