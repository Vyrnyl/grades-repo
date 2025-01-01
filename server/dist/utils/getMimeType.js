"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getMimeType = (filePath) => {
    const ext = path_1.default.extname(filePath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg')
        return 'image/jpeg';
    if (ext === '.png')
        return 'image/png';
    if (ext === '.gif')
        return 'image/gif';
    if (ext === '.bmp')
        return 'image/bmp';
    if (ext === '.webp')
        return 'image/webp';
    return 'application/octet-stream';
};
exports.default = getMimeType;
