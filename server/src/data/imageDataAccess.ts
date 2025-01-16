import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import getMimeType from "../utils/getMimeType";

const prisma = new PrismaClient();


const addImage = async (imageBuffer: Buffer, mimeType: string, userId: number) => {
    try {
        const image = await prisma.profilePic.create({
            data: {
                userId,
                data: imageBuffer,
                mimeType: mimeType,
            },
        });
       
        if(image) console.log("Stored!")

        return image
    } catch(error) {
        console.log(`Add image error: ${error}`);
        return null;
    }
}

const getImage = async (userId: number) => {
    try {
        const image = await prisma.profilePic.findFirst({ where: { userId }});
        
        return image
    } catch(error) {
        console.log(`Get image error: ${error}`);
        return null;
    }
}

const updateImage = async (imageBuffer: Buffer, mimeType: string, userId: number) => {
    try {

        const image = await prisma.profilePic.findFirst({ where: { userId }});

        if(image) {
            await prisma.profilePic.deleteMany({ where: { userId } });
        }

        const updateImage = await prisma.profilePic.create({
            data: {
                userId,
                data: imageBuffer,
                mimeType: mimeType,
            },
        });
        
        return updateImage
    } catch(error) {
        console.log(`Add image error: ${error}`);
        return null;
    }
}

export { addImage, getImage, updateImage }