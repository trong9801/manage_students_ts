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
exports.getListClass = exports.addClass = void 0;
const class_1 = __importDefault(require("../module/class"));
const mongoose_1 = __importDefault(require("mongoose"));
const addClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameClass = req.body.name;
        const findNameClass = yield class_1.default.findOne({ name: nameClass });
        // console.log(findNameClass)
        if (findNameClass) {
            throw new Error('lop da ton tai');
        }
        else {
            const newClass = {
                _id: new mongoose_1.default.Types.ObjectId(),
                name: nameClass
            };
            // console.log(newClass)
            yield class_1.default.create(newClass);
            return res.json({
                resuilt: {
                    status: 'thanh cong',
                    data: Object.assign({}, req.body),
                    message: ''
                }
            });
        }
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
exports.addClass = addClass;
const getListClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listClass = yield class_1.default.find();
        // console.log(listClass[0])
        if (listClass[0]) {
            return res.json({
                result: {
                    status: 'thanh cong',
                    data: listClass
                }
            });
        }
        else {
            throw new Error('danh sach trong');
        }
    }
    catch (err) {
        return res.json({
            resuilt: {
                status: 'that bai',
                message: err.message
            }
        });
    }
});
exports.getListClass = getListClass;
