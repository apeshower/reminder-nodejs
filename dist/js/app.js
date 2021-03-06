"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(index_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nvt4o.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('/next-ts-app/.next/static'));
}
mongoose_1.default.connect(uri).then(() => app.listen(PORT, () => console.log(`Server runs on htts://localhost:${PORT}`))).catch(error => {
    throw error;
});
