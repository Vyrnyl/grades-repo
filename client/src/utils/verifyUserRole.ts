import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const verifyUserRole = (userRole: string) => {

    
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if(role !== "student") {
            localStorage.removeItem("atoken");
        }
    }, []);
}

export default verifyUserRole;