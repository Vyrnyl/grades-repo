import { PrismaClient } from "@prisma/client";
import { LoginActivity } from "../types/types";

const prisma = new PrismaClient();

const getLoginActivity = async () => {
    try {
        const classes = await prisma.loginActivity.findMany();
        return classes;
    } catch(error) {
        console.log(`Get activity error: ${error}`);
        return null;
    }
}

const addLoginActivity = async (data: LoginActivity) => {
    try {
        const addedActivity = await prisma.loginActivity.create({
            data
        });
        return addedActivity;
    } catch(error) {
        console.log(`Add error: ${error}`);
        return null;
    }
}



export { getLoginActivity, addLoginActivity }