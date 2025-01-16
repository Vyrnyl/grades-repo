import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import authenticate from '../../services/authenticate'
import logo from '../../assets/images/cictLogo.jpg'
import AuthFormInput from './components/AuthFormInput'
import tokenInfo from '../../utils/tokenInfo'
import handleInputChange from '../../utils/handleInputChange'
import { hidePassword } from '../../utils/hidePassword'


const LoginPage = ({ setUserRole } : { setUserRole: (role: string) => void}) => {

    
    //ValidateInput
    const [loginInfo, setLoginInfo] = useState<{ email: string, password: string }>({ email: '', password: '' });
    const [inputError, setInputError] = useState<{ path: string, message: string }[]>(
        [
            { path: '', message: ''}, 
            { path: '', message: ''}
        ]);
    const [infoError, setInfoError] = useState<{ error: string }>({ error: ''});
    
    //Auth
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setInfoError({ error: '' });
        setIsLoading(true);

        const auth = await authenticate(loginInfo);

        if(auth.validationError) {
            if(auth.validationError[0].path === 'password') {
                setInputError([{ path: 'email', message: ''}, { path: 'password', message: auth.validationError[0].message}]);
            } else setInputError(auth.validationError);
        }

        if(auth.error) {
            setInfoError(auth);
            setIsLoading(false);
        }
        
        const userInfo = tokenInfo();
        setUserRole(userInfo.role);
        
        if(auth.message) {
            navigate('/');
        }

    }

    useEffect(() => {
        if(infoError.error && inputError.length > 0) {
            setInputError([]);
        } 
        
        if (inputError.length > 0) setIsLoading(false);

    }, [infoError, inputError]);
    
    //HIdePass
    const [inputType, setInputType] = useState<string>('password');
    const [isHide, setIsHide] = useState<boolean>(false);
    const [eyeIcon, setEyeIcon] = useState(faEyeSlash);

    //InputFocus
    const handleInputFocus = () => {
        setInfoError({ error: '' });
        setInputError([]);
    }
    
    return (
        <div className='relative'>
            <div className="login-bg h-[100vh] grid place-items-center"></div>
            <div className='h-[35rem] w-[25rem] bg-white flex flex-col absolute 
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[2rem]'>
                <div className='bg-cya-200 flex-[.4] px-4 flex flex-col items-center justify-between pt-4'>
                    <h1 className='bg-blu-200 font-[700] text-[.9rem] text-center break-words'>
                        WEB-BASED GRADES REPOSITORY WITH GRADE VIEWING SUPPORT FOR CATSU
                    </h1>
                    <img src={logo} alt="logo" className='h-[10rem] rounded-full' />
                </div>
                <div className='bg-gree-200 flex-[.6]'>
                    <form className='bg-cya-500 flex flex-col items-center' onSubmit={authUser}>
                        <span className={`bg-re-400 text-[.8rem] text-red-500 
                            ${infoError.error ? '' : 'invisible'}`}>{infoError.error || 'x'}</span>
                        <div className='bg-re-200 flex flex-col w-[100%] items-center gap-6 relative mb-2 pb-2'>
                            <AuthFormInput type='text' label='Email' name='email' 
                            onChange={(e) => handleInputChange(e, setLoginInfo)}
                            onFocus={handleInputFocus}
                            errorMessage={inputError[0]?.message || ''}/>

                            <AuthFormInput type={inputType} label='Password' name='password' 
                            onChange={(e) => handleInputChange(e, setLoginInfo)}
                            onFocus={handleInputFocus}
                            errorMessage={inputError[1]?.message || ''}/>

                            <FontAwesomeIcon className={`cursor-pointer absolute bottom-[1.1rem] right-[5rem]`} 
                             onClick={() => hidePassword({isHide, setIsHide, setInputType, setEyeIcon})} icon={eyeIcon}/>
                        </div>
                        {/* <span className='bg-blu-500 text-[.8rem] self-start ml-[4.5rem]
                            cursor-pointer mb-2 text-purple-500 active:text-blue-500'>Forgot Password?</span> */}
                        <button className='bg-purple-500 text-white w-[65%] h-[2.5rem] rounded-lg font-[500]
                         active:bg-slate-500 mb-2'>{isLoading ? 'Logging In...' : 'Log In'}</button>
                         <p className='text-[.8rem]'>Don't have an account? <span className='text-purple-500
                            cursor-pointer active:text-blue-500' onClick={() => navigate('/signup')}>Sign Up</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage