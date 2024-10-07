import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthTokenStore from "../store/useAuthTokenStore";

type ErrorType<TError> = {
    error?: TError
}
type DataType<TData> = {
    error?: TData,
    message?: string
}

const useFetch = <TError, TData>(path: string, method: string, body?: BodyInit) => {

    const [data, setData] = useState<DataType<TData> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType<TError> | null>(null);
    const navigate = useNavigate();
    const { setIsAuth } = useAuthTokenStore();

    const token = localStorage.getItem('atoken');

    useEffect(() => {
        const request = async () => {

            if(!token) {
                navigate('/login');
            }

            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/${path}`, {
                    method,
                    headers: {
                        'Authorization': token ? token : '',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                const data = await res.json();
        
                if(!res.ok && res.status === 422) {
                    setError(data);
                } else {
                    setData(data);
                }
                
            } catch(error) {
                console.log('Error: ', error);
            } finally {
                setLoading(false);
            }
        }
        request();
    }, []);

    if(data?.error === 'Token Expired' || data?.error === 'Access Denied') {
        navigate('/login');
    }

    if(data?.message) {
        setIsAuth();
    }
    
    return { loading, data, error};

}

export default useFetch;