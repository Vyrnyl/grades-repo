import { faClose, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../../types/studentTypes"
import { useEffect, useRef, useState } from "react"
import Input from "../shared/components/Input"
import handleInputChange from "../../utils/handleInputChange"
import HandleOutsideClick from "../../utils/HandleOutsideClick"
import CustomSelect from "./CustomSelect"
import yearSuffix from "../../utils/yearSuffix"
import getProgramName from "../../utils/getProgramName"
import getProgramId from "../../utils/getProgramId"
import getProgram from "../../utils/getProgram"
import StudentCoursePage from "../admin/StudentCoursePage"

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
    status: string,
    programId: number
}

type UserRowProps = {
    user: User,
    setUsers: React.Dispatch<React.SetStateAction<[] | User[]>>,
    // setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const UserRow = ({ user, setUsers } : UserRowProps) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { id, studentId, firstName, lastName, email, yearLevel, block, role, sex, status, programId } = user;
    const [userData, setUserData] = useState<UserData>({
        id, studentId, firstName, lastName, email, role,
        yearLevel, block, sex, status, programId
    });


    //Update
    const [blockArr, setBlockArr] = useState(['A', 'B', 'C','D']);
    const [yearLevelArr, setYearLevelArr] = useState(['1st', '2nd', '3rd', '4th']);
    const [programArr, setProgramArr] = useState([
        'BS Information Technology', 
        'BS Computer Science', 
        'BS Information Systems',
        'BL Information Science',
        'BS Entertainment and Multimedia Computing'
    ]);

    const [selectedProgram, setSelectedProgram] = useState('BS Information Technology');
    const [selectedYearLevel, setSelectedYearLevel] = useState('');
    const [selectedBlock, setSelectedBlock] = useState('');
    
    

    //SET DROPDOWN VALUES
    useEffect(() => {
        setSelectedBlock(block);
        setSelectedYearLevel(`${yearLevel}${yearSuffix(yearLevel)}`);
        setSelectedProgram(getProgramName(programId));
    }, [user]);

    
    //
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



    //SUBMIT UPDATE
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isUserIdExist, setIsUserIdExist] = useState(false);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEmailExist(false);
        setIsUserIdExist(false);
        
        const updatedData = {
            id,
            studentId: updateData.studentId,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            email: updateData.email,
            role: updateData.role,
            yearLevel: Number(selectedYearLevel.charAt(0)) || 1,
            block: selectedBlock,
            sex: updateData.sex,
            status: updateData.status,
            programId: getProgramId(selectedProgram)
        }
        const updateUser = async () => {
          
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
              setIsOpen(false);
            }

            if(res.status === 409) setIsUserIdExist(true);
            if(data.error && res.status !== 409) setIsEmailExist(true);
    
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


    //Style
    const ref = useRef<HTMLFormElement>(null);
    HandleOutsideClick(ref, setIsOpen);
    
    const delRef = useRef<HTMLDivElement>(null);
    HandleOutsideClick(delRef, setIsDelete);

    const [isListOpen, setIsListOpen] = useState(false);

    return (
        <>
            <tr className="bg-slate-100 hover:bg-slate-200">
                <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.studentId}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{`${userData.firstName}`}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.lastName}</td>
                <td className="px-2 py-4 text-center border-2 border-slate-500">{userData.email}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{getProgram(userData.programId)}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.yearLevel || ''}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.block}</td>
                <td className="px-4 py-4 text-center border-2 border-slate-500">
                    <div className="flex gap-6 justify-center">
                        {isOpen && 

                            <form ref={ref} onSubmit={handleUpdate} className="bg-slate-300 w-[35%] absolute z-10 flex flex-col pt-[.8rem] 
                            px-[3rem] top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">

                                <FontAwesomeIcon className="absolute text-[1.5rem] right-4 
                                top-2 font-bold hover:scale-110 active:scale-100" 
                                    icon={faClose}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsEmailExist(false);
                                    }}
                                />
                                
                                <div className="bg-blu-200 ml-[-2rem] mb-4">
                                    <p className="font-semibold text-[1.1rem] text-start">Edit Student</p>
                                </div>

                                <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                                    <div className="bg-purpl-200 flex flex-col gap-4">

                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Student ID:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            value={updateData.studentId}
                                            onChange={(e) => handleInputChange(e, setUpdateData)}
                                            name="studentId"
                                            />
                                    </div>
                                    {isUserIdExist && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
                                    ml-2 text-start mt-[-1rem]">UserID already exist!</p>}

                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">First Name:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            value={updateData.firstName}
                                            onChange={(e) => handleInputChange(e, setUpdateData)}
                                            name="firstName"
                                            />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Last Name:</label>
                                        <Input 
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            value={updateData.lastName}
                                            onChange={(e) => handleInputChange(e, setUpdateData)}
                                            name="lastName"
                                            />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Email:</label>
                                        <Input 
                                            type="email" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            required={true}
                                            value={updateData.email}
                                            onChange={(e) => handleInputChange(e, setUpdateData)}
                                            name="email"
                                            />
                                        {isEmailExist && <p className="text-[.8rem] font-semibold text-red-500 ml-2 text-start">
                                            Email already registered!</p>}
                                    </div>
                                    <div className={`bg-gree-300 flex flex-col ${isEmailExist && 'mt-[-1rem]'}`}>
                                        <label className="font-semibold text-start">Program:</label>
                                        <CustomSelect
                                            className=" border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                                            option={(programArr.splice(programArr.indexOf(selectedProgram), 1), programArr.unshift(selectedProgram), programArr)}
                                            setValue={setSelectedProgram}
                                        />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Year:</label>
                                        <CustomSelect
                                            className=" border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                                            option={(yearLevelArr.splice(yearLevelArr.indexOf(selectedYearLevel), 1), yearLevelArr.unshift(selectedYearLevel), yearLevelArr)}
                                            setValue={setSelectedYearLevel}
                                        />
                                    </div>
                                    <div className="bg-gree-300 flex flex-col">
                                        <label className="font-semibold text-start">Block:</label>
                                        <CustomSelect
                                            className=" border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                                            option={(blockArr.splice(blockArr.indexOf(selectedBlock), 1), blockArr.unshift(selectedBlock), blockArr)}
                                            setValue={setSelectedBlock}
                                        />
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
                        

                        {/* VIEW COURSES */}
                        <FontAwesomeIcon className="text-blue-500 active:text-white" 
                            icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                        <FontAwesomeIcon className="text-red-500 active:text-white" 
                            icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>
                        <button className="text-[.8rem] font-bold text-white bg-blue-500 px-2 rounded-[.2rem]"
                            onClick={() => setIsListOpen(true)}>View</button>
                        
                        {isDelete && 
                            <div ref={delRef} className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
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

                        {isListOpen && <StudentCoursePage setIsListOpen={setIsListOpen} user={user} />}
                    </div>
                </td>

            </tr>
        </>
    )
}

export default UserRow