"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRt = void 0;
const express_1 = __importDefault(require("express"));
const class_1 = require("../controler/class");
const router = express_1.default.Router();
router.post('/addClass', class_1.addClass);
router.get('/getListClass', class_1.getListClass);
exports.classRt = router;
