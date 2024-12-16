import { faPenToSquare, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../../types/studentTypes"
import { useEffect, useRef, useState } from "react"
import Input from "../shared/components/Input"
import handleInputChange from "../../utils/handleInputChange"
import SaveButton from "../shared/components/SaveButton"
import HandleOutsideClick from "../../utils/HandleOutsideClick"

type UserData = {
    id: number,
    studentId: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    yearLevel: number,
    block: string,
    sex: string,
    status: string
  }

type UserRowProps = {
    user: User,
    setUsers: React.Dispatch<React.SetStateAction<[] | User[]>>
}

const UserRow = ({ user, setUsers } : UserRowProps) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { id, studentId, firstName, lastName, email, yearLevel, block, role, sex, status } = user;
    const [userData, setUserData] = useState<UserData>({
        id,
        studentId,
        firstName,
        lastName,
        email,
        role,
        yearLevel,
        block,
        sex,
        status
    });


    //Update
    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState<Record<string, any>>({
        id,
        studentId,
        firstName,
        lastName,
        email,
        role,
        yearLevel,
        block,
        sex,
        status
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        
        // let fullName = updateData.fullName.split(' ');

        const updateUser = async () => {
    
          setIsOpen(!isOpen);
          const updatedData = {
            id,
            studentId: updateData.studentId,
            firstName: updateData.firstName.charAt(0) === '@' ? updateData.firstName : `@${updateData.firstName}`,
            lastName: updateData.lastName,
            email: updateData.email,
            role: updateData.role,
            yearLevel: Number(updateData.yearLevel),
            block: updateData.block,
            sex: updateData.sex,
            status: updateData.status
          }
          console.log(updatedData);
          try {
            const res = await fetch(`${apiUrl}/user/update-user`, {
              method: 'PUT',
              headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(updatedData)
            });
    
            const data = await res.json();
    
            if(res.ok && data) {
              setUserData(updatedData);
            }
    
          } catch(error) {
            console.log("Fetch error" + error);
          }
        }
        updateUser();

    }


    //Delete User
    const [isDelete, setIsDelete] = useState(false);

    const deleteUser = async () => {
        setIsDelete(false);
        try {
            const res = await fetch(`${apiUrl}/user/delete-user`, {
                method: 'DELETE',
                headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ userId: user.id })
            });

            const data = await res.json();

            if(res.ok && data) {
                setUsers(prev => prev.filter(u => u.id !== user.id));
                console.log(user)
            }
            
        } catch(error) {
            console.log('Request Error');
        }
    }

    //Program
    const [progCode, setProgcode] = useState('');
    useEffect(() => {
        if(user.program) setProgcode(user.program.programCode);
    }, [user]);

    //Style
    const ref = useRef<HTMLDivElement>(null);
    HandleOutsideClick(ref, setIsOpen);
    

    return (
        <tr className="bg-slate-100 hover:bg-slate-200 ">
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.studentId}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${userData.firstName.slice(1)}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.lastName}</td>
            <td className="px-2 py-4 text-center border-2 border-slate-500">{userData.email}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{progCode}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.yearLevel || ''}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.block}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">
                <div className="flex gap-6 justify-center">
                    {isOpen && 
                        <div ref={ref} className='bg-white absolute px-[1rem] py-[1.5rem] z-10 left-[50%] top-[50%] 
                            translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg'>
                
                            <FontAwesomeIcon className="absolute text-[1rem] right-[.8rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                icon={faX} onClick={() => setIsOpen(!isOpen)}/>
                    
                            <h1 className="text-[1.5rem] font-bold text-slate-700 self-center mb-2 text-center">Edit</h1>
                            <form onSubmit={handleUpdate} className='bg-gree-200 flex flex-col gap-4'>
                    
                                <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='studentId' 
                                value={updateData.studentId} placeholder='Student ID' 
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>
                    
                                <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='firstName' 
                                placeholder='First Name'
                                value={updateData.firstName.charAt(0) === '@' ? updateData.firstName.slice(1) : updateData.firstName}
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <Input type='text' className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='lastName' 
                                placeholder='Last Name'
                                value={updateData.lastName}
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>
                    
                                <Input type='text' max={2} className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='email' 
                                value={updateData.email} placeholder='Email'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <Input type='number' max={5} className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='yearLevel' 
                                value={updateData.yearLevel || ''} placeholder='Year Level'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>
                                
                                <Input type='text' max={2} className='w-[15rem] h-[2rem] placeholder:text-[.8rem]' name='block' 
                                value={updateData.block || ''} placeholder='Block'
                                onChange={(e) => handleInputChange(e, setUpdateData)}/>

                                <SaveButton className='w-[50%] self-center bg-blue-500 text-white'/>
                            </form>
                        </div>
                    }

                    <FontAwesomeIcon className="text-blue-500 active:text-white" 
                        icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                    <FontAwesomeIcon className="text-red-500 active:text-white" 
                        icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>

                    {isDelete && 
                        <div className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
                            translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg'>
                            <h1 className='text-slate-700 font-semibold text-[1.2rem] text-center'>Are you sure?</h1>
                            <div className='bg-cya-300 flex gap-4'>
                            <button className='bg-slate-500 text-white px-2 py-[.2rem] rounded-md'
                                onClick={() => setIsDelete(false)}>Cancel</button>
                            <button className='bg-red-500 text-white px-2 py-[.2rem] rounded-md'
                                onClick={deleteUser}>Delete</button>
                            </div>
                        </div>
                    }
                </div>
            </td>
        </tr>
    )
}

export default UserRow