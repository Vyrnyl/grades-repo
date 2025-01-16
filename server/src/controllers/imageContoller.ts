import { Request, Response } from "express";
import { addImage, getImage, updateImage } from "../data/imageDataAccess";

const addProfilePic = async (req: Request, res: Response) => {
  const { id } = req.body;
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const storeImage = await addImage(file.buffer, file.mimetype, Number(id));
  
  if (!storeImage) {
    return res.status(500).json({ error: 'Failed to store image' });
  }
  console.log('add')
  res.status(201).json({ message: 'Upload successful' });
}

const getProfilePic = async (req: Request, res: Response) => {
  
  const storedImage = await getImage(req.body.userId);
  
  if(!storedImage) {
      return res.status(404).json({ error: "Failed to retrieve image"});
  }
  
  const base64Image = storedImage.data.toString('base64');

  res.status(200).json({ image: base64Image, mimeType: storedImage.mimeType })
}

const updateProfilePic = async (req: Request, res: Response) => {

  const { id } = req.body;
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const storeImage = await updateImage(file.buffer, file.mimetype, Number(id));
  
  if (!storeImage) {
    return res.status(500).json({ error: 'Failed to store image' });
  }
  console.log('update')
  res.status(201).json({ message: 'Upload successful' });
}

export { addProfilePic, getProfilePic, updateProfilePic }