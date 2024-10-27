import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import authenticate from '../../services/authenticate'
import logo from '../../assets/images/logo.jpg'
import LoginInput from './components/LoginInput'
import tokenInfo from '../../utils/tokenInfo'


const LoginPage = ({ setUserRole } : { setUserRole: (role: string) => void}) => {

    //Auth
    const navigate = useNavigate();
    const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('k');
        
        const auth = await authenticate();
        console.log(auth);

        const userInfo = tokenInfo();
        setUserRole(userInfo.role);
        
        if(auth.message) {
            navigate('/');
        }
    }

    

    //HIdePass
    const [inputType, setInputType] = useState<string>('text');
    const [isHide, setIsHide] = useState<boolean>(false);
    const [eyeColor, setEyeColor] = useState<string>('text-black-500');
    const hidePassword = () => {
        setIsHide(!isHide);
        if(isHide) {
            setEyeColor('text-black-500');
            setInputType('password');
        } else {
            setEyeColor('text-slate-400');
            setInputType('text');
        }
    }

    return (
        <div className='relative'>
            <div className="login-bg h-[100vh] grid place-items-center"></div>
            <div className='h-[35rem] w-[25rem] bg-white flex flex-col absolute 
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[2rem]'>
                <div className='bg-cya-200 flex-[.4] grid place-items-center'>
                    <img src={logo} alt="logo" className='h-[10rem] rounded-full' />
                </div>
                <div className='bg-gree-200 flex-[.6] pt-4'>
                    <form className='bg-cya-500 flex flex-col gap-2 items-center' onSubmit={authUser}>
                        <div className='bg-re-200 flex flex-col w-[100%] items-center gap-6 relative'>
                            <LoginInput type='text' label='Email'/>
                            <LoginInput type={inputType} label='Password'/>
                            <FontAwesomeIcon className={`${eyeColor} cursor-pointer absolute bottom-[.6rem] right-[5rem]`} 
                             onClick={hidePassword} icon={faEyeSlash}/>
                        </div>
                        <span className='bg-blu-500 text-[.8rem] self-start ml-[4.5rem] active:text-purple-500
                            cursor-pointer'>Forgot Password?</span>
                        <button className='bg-purple-500 text-white w-[65%] h-[2.5rem] rounded-lg font-[500]
                         active:bg-slate-500'>Log In</button>
                         <p className='text-[.8rem]'>Don't have an account? <span className='text-purple-500
                            cursor-pointer'>Sign Up</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage