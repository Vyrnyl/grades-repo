import { faClose, faPenToSquare, faTrashCan, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../../types/studentTypes"
import { useEffect, useRef, useState } from "react"
import Input from "../shared/components/Input"
import handleInputChange from "../../utils/handleInputChange"
import SaveButton from "../shared/components/SaveButton"
import HandleOutsideClick from "../../utils/HandleOutsideClick"
import CustomSelect from "../faculty/CustomSelect"

type UserData = {
    id: number,
    studentId: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
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

    const { id, studentId, firstName, lastName, email, role, sex, status } = user;
    const [userData, setUserData] = useState<UserData>({
        id,
        studentId,
        firstName,
        lastName,
        email,
        role,
        sex,
        status
    });


    //Update

    const [selectedProgram, setSelectedProgram] = useState('BS Information Technology');



    const [isOpen, setIsOpen] = useState(false);
    const [updateData, setUpdateData] = useState<Record<string, any>>({
        id,
        studentId,
        firstName,
        lastName,
        email,
        role,
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
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            email: updateData.email,
            role: updateData.role,
            sex: updateData.sex,
            status: updateData.status
          }
          console.log(updateData);
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
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${userData.firstName}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.lastName}</td>
            <td className="px-2 py-4 text-center border-2 border-slate-500">{userData.email}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{progCode}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">
                <div className="flex gap-6 justify-center">
                    {isOpen && 
                        <form className="bg-slate-300 w-[35%] absolute z-10 flex flex-col pt-[.8rem] 
                        px-[3rem] top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">
                            
                            <FontAwesomeIcon className="absolute text-[1.5rem] right-4
                            top-2 font-bold hover:scale-110 active:scale-100" icon={faClose}/>

                            <div className="bg-blu-200 ml-[-2rem] mb-4">
                                <p className="font-semibold text-[1.1rem] text-start">Edit Faculty</p>
                            </div>

                            <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                                <div className="bg-purpl-200 flex flex-col gap-4">

                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Faculty ID:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            name="studentId"
                                            />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">First Name:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            name="firstName"
                                            />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Last Name:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            name="lastName"
                                            />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Email:</label>
                                        <Input 
                                            type="email" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            name="email"
                                            />
                                    </div>

                                    <div className="bg-gree-300 flex flex-col max-w-[15rem]">
                                        <label className="font-semibold text-start">Area of Specialization:</label>
                                        <CustomSelect 
                                            className=" border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                                            option={[
                                            'BS Information Technology', 
                                            'BS Computer Science', 
                                            'BS Information Systems',
                                            'BL Information Science',
                                            'BS Entertainment and Multimedia Computing'
                                            ]}
                                            setValue={setSelectedProgram}
                                        />

                                        {/* SELECTED */}
                                        <div className="bg-blu-200 max-h-[5rem] text-[.9rem] text-slate-700 font-semibold mt-2 
                                        flex flex-wrap gap-2 gap-x-4 overflow-y-auto">
                                            <div className="bg-pin-200 flex gap-2 h-[1.5rem]">
                                                <span className="text-center">BSIT</span>
                                                <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                                icon={faClose}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gree-300 flex flex-col relative max-w-[15rem]">
                                        <label className="font-semibold text-start">Course Subjects Handled:</label>
                                        <Input
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            />
                                            <button type="button" className="bg-[#60e0cf] rounded-r-md border-[.08rem] border-slate-700 
                                            w-[3rem] h-[2rem] font-semibold text-[.8rem] px-2 py-[.5rem] active:text-white 
                                            absolute top-[1.5rem] right-[-4%] grid place-content-center">Add</button>

                                            {/* SELECTED */}
                                            <div className="bg-blu-200 max-h-[5rem] text-[.9rem] text-slate-700 font-semibold mt-2 
                                            flex flex-wrap gap-2 gap-x-4 overflow-y-auto">
                                                <div className="bg-pin-200 flex gap-2 h-[1.5rem]">
                                                    <span className="text-center">CC101</span>
                                                    <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                                    icon={faClose}/>
                                                </div>
                                            </div>
                                        </div>

                                </div>
                            </div>
                            <div className="bg-gree-200 flex justify-end items-start mt-6 mb-4">
                                <div className="bg-re-200 flex gap-4">
                                    {/* <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-2 py-[.5rem] 
                                    active:text-white" type="button">Cancel</button> */}

                                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-4 py-[.5rem] 
                                    active:text-white" type="submit">Save</button>
                                </div>
                            </div>
                        </form>
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