"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfilePic = exports.getProfilePic = exports.addProfilePic = void 0;
const imageDataAccess_1 = require("../data/imageDataAccess");
const addProfilePic = async (req, res) => {
    const { id } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const storeImage = await (0, imageDataAccess_1.addImage)(file.buffer, file.mimetype, Number(id));
    if (!storeImage) {
        return res.status(500).json({ error: 'Failed to store image' });
    }
    console.log('add');
    res.status(201).json({ message: 'Upload successful' });
};
exports.addProfilePic = addProfilePic;
const getProfilePic = async (req, res) => {
    const storedImage = await (0, imageDataAccess_1.getImage)(req.body.userId);
    if (!storedImage) {
        return res.status(404).json({ error: "Failed to retrieve image" });
    }
    const base64Image = storedImage.data.toString('base64');
    res.status(200).json({ image: base64Image, mimeType: storedImage.mimeType });
};
exports.getProfilePic = getProfilePic;
const updateProfilePic = async (req, res) => {
    const { id } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const storeImage = await (0, imageDataAccess_1.updateImage)(file.buffer, file.mimetype, Number(id));
    if (!storeImage) {
        return res.status(500).json({ error: 'Failed to store image' });
    }
    console.log('update');
    res.status(201).json({ message: 'Upload successful' });
};
exports.updateProfilePic = updateProfilePic;
