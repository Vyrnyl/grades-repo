import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const useAuth = (token: string) => {

    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenValidity = async () => {
            console.log('change');

            if(!token) {
                navigate('/login');
            }

            
            
        }
        checkTokenValidity();

    }, [navigate]);
}
export default useAuth;