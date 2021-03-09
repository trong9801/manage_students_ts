"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const port = process.env.port || 3000;
http_1.default.createServer(index_1.default).listen(port, () => {
    console.log(`server running to  ${port}`);
});
mongoose_1.default.connect(`mongodb+srv://vutrong:${process.env.MG_pass}@cluster0.sllrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('connect database succerfull');
});
