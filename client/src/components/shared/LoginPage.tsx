import logo from '../../assets/images/logo.jpg'
import LoginInput from './components/LoginInput'
import authenticate from '../../services/authenticate'

const LoginPage = () => {

    const authUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('k');
        const auth = await authenticate();
        
        console.log(auth);
        
    }
    
    return (
        <div className='relative'>
            <div className="login-bg h-[100vh] grid place-items-center"></div>
            <div className='h-[35rem] w-[22rem] bg-white flex flex-col absolute 
            top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[2rem]'>
                <div className='bg-cya-200 flex-[.4] grid place-items-center'>
                    <img src={logo} alt="logo" className='h-[10rem] rounded-full' />
                </div>
                <div className='bg-gree-200 flex-[.6] pt-4'>
                    <form className='flex flex-col gap-10 items-center' onSubmit={authUser}>
                        <LoginInput type='text' label='Name'/>
                        <LoginInput type='passwor' label='Password'/>
                        <button className='bg-slate-600 text-white w-[8rem] h-[3rem] rounded-sm font-[500]
                         active:bg-slate-500'>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage