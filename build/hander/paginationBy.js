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
exports.paginationBy = void 0;
const class_1 = __importDefault(require("../module/class"));
const students_1 = __importDefault(require("../module/students"));
const paginationBy = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const curentPage = data.page || 1;
    const perPage = data.perPage || 5;
    let query;
    if (!data.slelectBy) {
        throw new Error('nhap truong muon tim kiem');
    }
    if (data.db == 'student') {
        query = students_1.default.find(data.slelectBy);
    }
    if (data.db == 'class') {
        query = class_1.default.find(data.slelectBy);
    }
    const totalDoc = yield query;
    if (!totalDoc[0]) {
        throw new Error('danh sach trong');
    }
    const listDoc = yield ((_a = query === null || query === void 0 ? void 0 : query.populate({ path: `${data.path}`, select: `${data.select}` })) === null || _a === void 0 ? void 0 : _a.sort(data.sort).skip((curentPage * perPage) - perPage).limit(perPage));
    const result = {
        curentPage: curentPage,
        data: listDoc,
        lastPage: Math.ceil(totalDoc.length / perPage),
        perPage: perPage
    };
    return result;
});
exports.paginationBy = paginationBy;
