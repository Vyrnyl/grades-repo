import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import getMimeType from "../utils/getMimeType";

const prisma = new PrismaClient();


const addImage = async () => {
    try {
        const imagePath = 'path/to/your/image.png';
        const imageBuffer = readFileSync(imagePath);
        const mimeType = getMimeType(imagePath);
        
        const image = await prisma.profilePic.create({
            data: {
            data: imageBuffer,
            mimeType: mimeType,
        },
  });
    } catch(error) {
        console.log(`Add image error: ${error}`);
        return null;
    }
}

export { addImage }