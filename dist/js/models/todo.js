"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    list_id: {
        type: String,
        required: true
    },
    datePicked: {
        type: String,
        required: true
    },
    timePicked: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Todo", todoSchema);
