"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteStudent = exports.getListStudents = exports.getListByStatus = exports.detailStudent = exports.updateClassStudent = exports.updateSudent = exports.updateStatus = exports.addStudents = void 0;
const class_1 = __importDefault(require("../module/class"));
const students_1 = __importDefault(require("../module/students"));
const mongoose = __importStar(require("mongoose"));
const pagination_1 = require("../hander/pagination");
const paginationBy_1 = require("../hander/paginationBy");
const students_2 = require("../validation/students");
const addStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const codeStudent = req.body.codeStudent;
    const nameClass = req.body.nameClass;
    try {
        students_2.checkCodeStudents(codeStudent);
        const findStudent = yield students_1.default.findOne({ codeStudents: codeStudent });
        const finndIdClass = yield class_1.default.findOne({ name: nameClass });
        // console.log(finndIdClass)
        if (findStudent) {
            throw new Error('tai khoan da ton tai');
        }
        if (!finndIdClass) {
            throw new Error('lop khong ton tai');
        }
        const newStudent = Object.assign(Object.assign({ _id: new mongoose.Types.ObjectId }, req.body), { codeStudents: codeStudent, nameClass: finndIdClass === null || finndIdClass === void 0 ? void 0 : finndIdClass._id });
        // console.log(newStudent)
        yield students_1.default.create(newStudent);
        return res.json({
            result: {
                status: 'thanh cong',
                data: Object.assign({}, newStudent),
                message: ""
            }
        });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.addStudents = addStudents;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeStudent = req.query.codeStudent;
        students_2.checkCodeStudents(codeStudent);
        const findStudent = yield students_1.default.findOne({ codeStudents: codeStudent });
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai');
        }
        const updateStatus = Object.assign(Object.assign({}, req.body), { codeStudent: codeStudent });
        yield students_1.default.findByIdAndUpdate(findStudent === null || findStudent === void 0 ? void 0 : findStudent._id, updateStatus);
        return res.json({
            result: {
                status: 'thanh cong',
                message: ''
            }
        });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.updateStatus = updateStatus;
const updateSudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeStudent = req.query.codeStudent;
        students_2.checkCodeStudents(codeStudent);
        const findStudent = yield students_1.default.findOne({ codeStudents: codeStudent });
        if (!findStudent) {
            throw new Error('tai khoan khong ton tai');
        }
        const updateInforStudent = Object.assign(Object.assign({}, req.body), { codeStudent: codeStudent });
        yield students_1.default.findByIdAndUpdate(findStudent === null || findStudent === void 0 ? void 0 : findStudent._id, updateInforStudent);
        // console.log(updateInforStudent)
        return res.json({
            result: {
                status: 'thanh cong',
                data: Object.assign({}, req.body),
                message: ''
            }
        });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: Object.assign({}, req.body),
                message: err.message
            }
        });
    }
});
exports.updateSudent = updateSudent;
const updateClassStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeStudent = req.query.codeStudent;
        const nameClass = req.body.nameClass;
        const findStudent = yield students_1.default.findOne({ codeStudents: codeStudent }).populate({ path: 'nameClass', select: 'name' });
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai');
        }
        const findClass = yield class_1.default.findOne({ name: nameClass });
        if (!findClass) {
            throw new Error('lop khong ton tai');
        }
        const update = findStudent;
        update.nameClass = findClass._id;
        // console.log(findStudent)
        yield students_1.default.findByIdAndUpdate(findStudent._id, update);
        return res.json({
            result: {
                status: "thanh cong",
                data: update,
                message: ''
            }
        });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.updateClassStudent = updateClassStudent;
const detailStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeStudent = req.query.codeStudent;
        students_2.checkCodeStudents(codeStudent);
        const detailStudent = yield students_1.default.findOne({ codeStudents: codeStudent }).populate({ path: 'nameClass', select: 'name' });
        if (detailStudent) {
            return res.json({
                result: {
                    status: 'thanh cong',
                    data: detailStudent,
                    message: ''
                }
            });
        }
        else {
            throw new Error('tai khoan khong ton tai');
        }
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: {},
                message: err.message
            }
        });
    }
});
exports.detailStudent = detailStudent;
const getListByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let perPage = req.query.perPage;
        perPage = parseInt(perPage) || 3;
        let page = req.query.page;
        page = parseInt(page) || 1;
        const status = req.query.status;
        // console.log(status)
        const list = {
            db: 'student',
            page: page,
            perPage: perPage,
            sort: { codeStudents: 'asc' },
            slelectBy: { status: status },
            select: 'name',
            path: 'nameClass'
        };
        const data = yield paginationBy_1.paginationBy(list);
        return res.json({ result: data });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                data: {},
                message: err.message
            }
        });
    }
});
exports.getListByStatus = getListByStatus;
const getListStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let perPage = req.query.perPage;
        perPage = parseInt(perPage) || 3;
        let page = req.query.page;
        page = parseInt(page) || 1;
        const list = {
            db: 'student',
            page: page,
            perPage: perPage,
            sort: { codeStudents: 'asc' }
            // select : 'name',
            // path : 'nameClass'
        };
        const data = yield pagination_1.paginations(list);
        return res.json({ result: data });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.getListStudents = getListStudents;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeStudent = req.query.codeStudent;
        students_2.checkCodeStudents(codeStudent);
        const findStudent = yield students_1.default.findOne({ codeStudents: codeStudent });
        if (!findStudent) {
            throw new Error('hoc sinh khong ton tai');
        }
        yield students_1.default.findByIdAndDelete(findStudent._id);
        return res.json({
            result: {
                status: 'thanh cong',
                message: ''
            }
        });
    }
    catch (err) {
        return res.json({
            result: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.deleteStudent = deleteStudent;
