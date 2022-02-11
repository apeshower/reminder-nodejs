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
exports.getAllData = exports.deleteList = exports.updateList = exports.addList = exports.getLists = void 0;
const list_1 = __importDefault(require("../../models/list"));
// [
//     {
//       '$addFields': {
//         'id': {
//           '$toString': '$_id'
//         }
//       }
//     }, {
//       '$lookup': {
//         'from': 'todos', 
//         'localField': 'id', 
//         'foreignField': 'list_id', 
//         'as': 'todos'
//       }
//     }, {
//       '$addFields': {
//         'totalTodosCount': {
//           '$size': '$todos'
//         }
//       }
//     }
//   ]
const getLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('check');
    try {
        const lists = yield list_1.default.find();
        console.log('check', lists);
        res.status(200).json({ lists });
    }
    catch (error) {
        throw error;
    }
});
exports.getLists = getLists;
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pipeline = [
            {
                '$addFields': {
                    'id': {
                        '$toString': '$_id'
                    }
                }
            }, {
                '$lookup': {
                    'from': 'todos',
                    'localField': 'id',
                    'foreignField': 'list_id',
                    'as': 'todos'
                }
            }, {
                '$addFields': {
                    'totalTodosCount': {
                        '$size': '$todos'
                    }
                }
            }
        ];
        const lists = yield list_1.default.aggregate(pipeline);
        console.log('check', lists);
        res.status(200).json({ lists });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllData = getAllData;
const addList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('request', req);
    try {
        const body = req.body;
        console.log('request body', body);
        const list = new list_1.default({
            title: body.title,
            color: body.color,
            status: body.status
        });
        const newList = yield list.save();
        const allLists = yield list_1.default.find();
        res.status(201).json({ message: "List added", list: newList, lists: allLists });
    }
    catch (error) {
        console.log('error adding list', error);
        // throw error
    }
});
exports.addList = addList;
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body } = req;
        const updateList = yield list_1.default.findByIdAndUpdate({ _id: id }, body);
        const allLists = yield list_1.default.find();
        res.status(200).json({
            message: "List updated",
            list: updateList,
            lists: allLists
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateList = updateList;
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedList = yield list_1.default.findByIdAndDelete(req.params.id);
        const allLists = yield list_1.default.find();
        res.status(200).json({
            message: "List deleted",
            list: deleteList,
            lists: allLists
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteList = deleteList;
