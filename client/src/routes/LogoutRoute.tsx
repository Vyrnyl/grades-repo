import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutRoute = ({ role } : { role: string }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(role === '') {
            localStorage.removeItem('atoken');
            navigate('/login');
        }
    }, []);
    
    return (
        <></>
    )
}

export default LogoutRoute