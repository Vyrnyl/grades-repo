import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AuthFormInput from './components/AuthFormInput';
import {hideConfirmPassword, hidePassword } from '../../utils/hidePassword';

const SignupPage = () => {

    const navigate = useNavigate();


    //Register User
    const [role, setRole] = useState<string>('');
    const registerUser = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value);
    }
    console.log(role);



    //HidePass #no abstract
    const [isHide, setIsHide] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [eyeIcon, setEyeIcon] = useState(faEyeSlash);

    const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState<boolean>(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState<string>('password');   
    const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(faEyeSlash);

  return (
    <div className='relative'>
            <div className="login-bg h-[100vh] grid place-items-center"></div>
            <div className='h-[35rem] w-[25rem] bg-white flex flex-col absolute 
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[2rem] justify-center'>
                <div className='bg-gree-200 flex-[.6]'>
                    <h1 className="text-[1.4rem] font-bold text-slate-800 text-center py-2">Create Account</h1>
                    <form className='bg-cya-500 flex flex-col items-center' onSubmit={registerUser}>
                        <div className='bg-re-200 flex flex-col w-[100%] items-center gap-4 relative mb-2 pb-2'>
                            <AuthFormInput type='text' label='FirstName' name='firstName'/>
                            <AuthFormInput type='text' label='LastName' name='lastName'/>
                            <AuthFormInput type='text' label='Email' name='email'/>
                            <select value={role} onChange={handleSelectChange} className='bg-re-300 h-[2.5rem] w-[65%] focus:outline-slate-500
                                border-[.1rem] border-slate-500 rounded-lg px-2 text-[.8rem]'>
                                <option value="" disabled>User Type</option>
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="admin">Admin</option>
                            </select>
                            <AuthFormInput type={inputType} label='Password' name='password'/>                          
                            <AuthFormInput type={confirmPasswordType} label='Confirm Password' name='confirmPassword'/>
                            
                            <FontAwesomeIcon className={`cursor-pointer absolute bottom-[4.5rem] right-[5rem]`} 
                             onClick={() => hidePassword({ isHide, setIsHide, setInputType, setEyeIcon })} icon={eyeIcon}/>
                            <FontAwesomeIcon className={`cursor-pointer absolute bottom-[1.1rem] right-[5rem]`} 
                            onClick={() => hideConfirmPassword({ 
                                isConfirmPasswordHide, 
                                setIsConfirmPasswordHide,
                                setConfirmPasswordType,
                                setConfirmPasswordEyeIcon
                            })} icon={confirmPasswordEyeIcon}/>
                        </div>
                        <button className='bg-purple-500 text-white w-[65%] h-[2.5rem] rounded-lg font-[500]
                         active:bg-slate-500 mb-2'>Sign Up</button>
                         <p className='text-[.8rem]'>Already have an account? <span className='text-purple-500
                            cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default SignupPage