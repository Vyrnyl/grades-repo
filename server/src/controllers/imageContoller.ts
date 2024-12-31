import { Request, Response } from "express";
import { addImage } from "../data/imageDataAccess";


const addProfilePic = async (req: Request, res: Response) => {

    const storeImage = await addImage();

    // if(!storeImage) {
    //     return res.status(500).json({ error: "Failed to store image"});
    // }

    res.status(201).json({ mess: 'TEST' });
}

export { addProfilePic }