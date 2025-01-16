import { jwtDecode } from "jwt-decode";

const tokenInfo = () => {

    try {
        const token = localStorage.getItem('atoken') || '';
        let userInfo: { userId: number, firstName: string, role: string } = jwtDecode(token);
        return userInfo;
    } catch(err) {
        return { userId: -1, firstName: '', role: '' };
    }
    
    
    
}

export default tokenInfo;