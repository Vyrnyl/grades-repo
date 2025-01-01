"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImage = exports.getImage = exports.addImage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addImage = async (imageBuffer, mimeType, userId) => {
    try {
        const image = await prisma.profilePic.create({
            data: {
                userId,
                data: imageBuffer,
                mimeType: mimeType,
            },
        });
        if (image)
            console.log("Stored!");
        return image;
    }
    catch (error) {
        console.log(`Add image error: ${error}`);
        return null;
    }
};
exports.addImage = addImage;
const getImage = async (userId) => {
    try {
        const image = await prisma.profilePic.findFirst({ where: { userId } });
        return image;
    }
    catch (error) {
        console.log(`Get image error: ${error}`);
        return null;
    }
};
exports.getImage = getImage;
const updateImage = async (imageBuffer, mimeType, userId) => {
    try {
        const image = await prisma.profilePic.findFirst({ where: { userId } });
        if (image) {
            await prisma.profilePic.deleteMany({ where: { userId } });
        }
        const updateImage = await prisma.profilePic.create({
            data: {
                userId,
                data: imageBuffer,
                mimeType: mimeType,
            },
        });
        return updateImage;
    }
    catch (error) {
        console.log(`Add image error: ${error}`);
        return null;
    }
};
exports.updateImage = updateImage;
