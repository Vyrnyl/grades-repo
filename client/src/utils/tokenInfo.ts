import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const tokenInfo = () => {

    try {
        const token = localStorage.getItem('atoken') || '';
        let userInfo: { role: string } = jwtDecode(token);
        return userInfo;
    } catch(err) {
        return { role: '' };
    }
    
    
    
}

export default tokenInfo;