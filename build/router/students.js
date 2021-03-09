"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRt = void 0;
const express_1 = __importDefault(require("express"));
const students_1 = require("../controler/students");
const router = express_1.default.Router();
router.post('/addStudent', students_1.addStudents);
router.put('/updateStatus', students_1.updateSudent);
router.put('/updateInforStudent', students_1.updateStatus);
router.put('/updateClass', students_1.updateClassStudent);
router.delete('/deleteStudent', students_1.deleteStudent);
router.get('/detailStudent', students_1.detailStudent);
router.get('/getListStudents', students_1.getListStudents);
router.get('/getListByStatus', students_1.getListByStatus);
exports.studentsRt = router;
