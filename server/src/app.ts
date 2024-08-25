import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import 'dotenv/config';
import userAuth from './middleware/userAuth';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({
    exposedHeaders: ['Authorization', 'Refresh-Token']
}));
app.use((req, res, next) => {
    if(
        req.path === '/auth/signup' 
        || req.path === '/auth/login' 
        || req.path === '/auth/refresh-token'
    ) {
        return next();
    }
    userAuth(req, res, next);
});


app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'HOME'});
});
app.use('/auth', authRoutes);
app.use('/users', userRoutes );


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));