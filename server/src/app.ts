import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('HOME');
});
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));