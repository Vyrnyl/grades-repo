import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AuthFormInput from './components/AuthFormInput';
import {hideConfirmPassword, hidePassword } from '../../utils/hidePassword';
import handleInputChange from '../../utils/handleInputChange';
import { SignupInfoType } from '../../types/formTypes';
import register from '../../services/register';
import tokenInfo from '../../utils/tokenInfo';

const SignupPage = ({ setUserRole } : { setUserRole: (role: string) => void}) => {

    //HidePass
    const [isHide, setIsHide] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [eyeIcon, setEyeIcon] = useState(faEyeSlash);

    const [isConfirmPasswordHide, setIsConfirmPasswordHide] = useState<boolean>(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState<string>('password');   
    const [confirmPasswordEyeIcon, setConfirmPasswordEyeIcon] = useState(faEyeSlash);

    //ValidateInput
    const [inputError, setInputError] = useState<{ path: string, message: string }[]>([]);
    const [infoError, setInfoError] = useState<{ error: string }>({ error: ''});

    const textInputs = [
        { label: 'FirstName', name: 'firstName' },
        { label: 'LastName', name: 'lastName' },
        { label: 'email', name: 'email' }
    ];
    const passwordInputs = [
        { type: inputType, label: 'Password', name: 'password'},
        { type: confirmPasswordType, label: 'Confirm Password', name: 'confirmPassword'}
    ];


    //Register User
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState<SignupInfoType>({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        programId: null,
        studentId: '',
        password: '',
        confirmPassword: ''
    });
    console.log(signupInfo)
    const registerUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const signup = await register(signupInfo);

        if(signup.error) {
            setInfoError({ error: signup.error });
            setInputError([]);
        }
        if(signup.validationError) {
            setInputError(signup.validationError);
        }
        console.log(signup)
        const userInfo = tokenInfo();
        setUserRole(userInfo.role);

        if(signup.message) {
            navigate('/');
        }

        console.log(signup);    
    }
    
    //InputFocus
    const handleInputFocus = () => {
        setInfoError({ error: '' });
    }

  return (
    <div className='relative'>
            <div className="login-bg h-[100vh] grid place-items-center"></div>
            <div className='w-[25rem] bg-white flex flex-col absolute py-8
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[2rem] justify-center'>
                <div className='bg-gree-200 flex-[.6]'>
                    <h1 className="text-[1.4rem] font-bold text-slate-800 text-center py-2">Create Account</h1>
                    
                    <form className='bg-cya-500 flex flex-col items-center' onSubmit={registerUser}>
                    <span className={`bg-re-400 text-[.8rem] text-red-500 
                            ${infoError.error ? '' : 'invisible'}`}>{infoError.error || 'x'}</span>
                        <div className='bg-re-200 flex flex-col w-[100%] items-center gap-4 relative mb-2 pb-2'>
                            {textInputs.map((input, i) => {
                                
                                const error = inputError.find((error) => input.name === error.path);
                                const errorMessage = error ? error.message : '';

                                return <AuthFormInput key={i} type='text' 
                                    label={input.label} 
                                    name={input.name}
                                    onChange={(e) => handleInputChange(e, setSignupInfo)}
                                    onFocus={handleInputFocus}
                                    errorMessage={errorMessage} />
                            })}

                            <select required defaultValue="" 
                                onChange={(e) => setSignupInfo((prev) => ({...prev, role: e.target.value }))} 
                                className='bg-re-300 h-[2.5rem] w-[65%] focus:outline-slate-500
                                border-[.1rem] border-slate-500 rounded-lg px-2 text-[.8rem]'>
                                <option value="" disabled>User Type</option>
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                            </select>
                            {signupInfo.role === 'student' && 
                                <select required defaultValue="" 
                                    onChange={(e) => setSignupInfo((prev) => ({...prev, programId: Number(e.target.value) }))} 
                                    className='bg-re-300 h-[2.5rem] w-[65%] focus:outline-slate-500
                                    border-[.1rem] border-slate-500 rounded-lg px-2 text-[.8rem]'>
                                    <option value="" disabled>Program</option>
                                    <option value="1">BS Accountancy</option>
                                    <option value="2">BS Business Administration</option>
                                    <option value="3">BS Management Accounting</option>
                                </select>
                            }
                            <AuthFormInput type="text" 
                                label={`${signupInfo.role === 'faculty' ? 'Faculty ID' : 'Student ID'}`} 
                                name="studentId"
                                onChange={(e) => handleInputChange(e, setSignupInfo)} 
                                onFocus={handleInputFocus}/>

                            {passwordInputs.map((input, i) => {

                                const error = inputError.find((error) => input.name === error.path);
                                const errorMessage = error ? error.message : '';

                                return <AuthFormInput key={i} type={input.type} label={input.label} name={input.name}
                                onChange={(e) => handleInputChange(e, setSignupInfo)} onFocus={handleInputFocus} 
                                errorMessage={errorMessage}/>;
                            })}
                            
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
                            cursor-pointer active:text-blue-500' onClick={() => navigate('/login')}>Login</span></p>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default SignupPage