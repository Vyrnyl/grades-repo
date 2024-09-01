import brcypt from 'bcrypt';

const hashPassword = async (password: string) => {
    return await brcypt.hash(password, 10);
};

const comparePassword = async (password: string, encrypted: string) => {
    return await brcypt.compare(password, encrypted);
};

export { hashPassword, comparePassword };