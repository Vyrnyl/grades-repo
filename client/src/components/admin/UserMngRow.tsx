import React, { useEffect, useRef, useState } from 'react'
import { User } from '../../types/studentTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Input from '../shared/components/Input'
import CustomSelect from '../faculty/CustomSelect'
import handleInputChange from '../../utils/handleInputChange'
import optionArray from '../../utils/optionArray'
import HandleOutsideClick from '../../utils/HandleOutsideClick'
import isValidFormat from '../../utils/admin/isValidFormat'
import isFacIDValid from '../../utils/isFacIDValid'

type UserData = {
    id: number,
    studentId: string,
    firstName: string,
    middleName?: string,
    lastName: string,
    email: string,
    role: string,
    sex: string,
    status: string
}


type UserMngRow = {
    user: User,
    setUsers: React.Dispatch<React.SetStateAction<[] | User[]>>
}

const UserMngRow = ({ user, setUsers } : UserMngRow) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');


    const { id, studentId, firstName, middleName, lastName, email, sex, status, role } = user;

    const [userData, setUserData] = useState<UserData>({
        id, studentId, firstName, middleName, lastName, email, role, sex, status
    });

    

    //UPDATE
    const [genderArr, setGenderArr] = useState(['Male', 'Female']);
    const [studentStatus, setStudentStatus] = useState(['Enrolled', 'Unenrolled']);
    const [facultyStatus, setFacultyStatus] = useState(['Active', 'Inactive']);
    
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    const [updateData, setUpdateData] = useState<Record<string, any>>({
        id, studentId, firstName, lastName, email, role, sex, status
    });
    

    
    //SET DROPDOWN VALUES
    useEffect(() => {
        setSelectedGender(sex);
        setSelectedStatus(status);
    }, [user]);
    

    //SUBMIT UPDATE
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isUserIdExist, setIsUserIdExist] = useState(false);
    const [isValidIDFormat, setIsValidIDFormat] = useState(false);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEmailExist(false);
        setIsUserIdExist(false);
        setIsValidIDFormat(false);
        
        const updatedData = {
            id,
            studentId: updateData.studentId,
            firstName: updateData.firstName,
            lastName: updateData.lastName,
            email: updateData.email,
            role: updateData.role,
            sex: selectedGender === null || selectedGender === '' ? genderArr[0] : selectedGender,
            status: selectedStatus === null || selectedStatus === '' ? 
            (user.role === 'student' ? studentStatus[0] : facultyStatus[0])  : selectedStatus
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

            if(res.status === 409) {
                setTimeout(() => {
                    setIsUserIdExist(true);
                }, 100);
            }
            if(data.error && res.status !== 409) setIsEmailExist(true);
    
          } catch(error) {
            console.log("Fetch error" + error);
          }
        }
        if(updatedData.role === 'student' ? isValidFormat(updateData.studentId) : isFacIDValid(updateData.studentId)) 
            updateUser();
        else setTimeout(() => {
            setIsValidIDFormat(true);
            setIsUserIdExist(false);  
        }, 100);
    }



    //DELETE
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
            }
            
        } catch(error) {
            console.log('Request Error');
        }
    }

    //Style
    const [isOpen, setIsOpen] = useState(false);
    // const [error, setError] = useState('');

    const ref = useRef<HTMLFormElement>(null);
    HandleOutsideClick(ref, setIsOpen);

    const delRef = useRef<HTMLDivElement>(null);
    HandleOutsideClick(delRef, setIsDelete);

    return (
    <tr key={user.id} className="bg-slate-100 hover:bg-slate-200">
        <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.studentId}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{`${userData.firstName.charAt(0) == '@' ? 
        userData.firstName.slice(1) : 
        userData.firstName}  
        ${userData.middleName && userData.middleName !== '' ? `${userData.middleName.charAt(0)}.` : ''}
        ${user.lastName}`}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.email}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.sex}</td>
        {/* <td className="px-4 py-4 text-center border-2 border-slate-500">
            {`${userData.role.charAt(0).toUpperCase()}${userData.role.slice(1)}`}</td> */}
        <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.status}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">{user.createdAt.split('T')[0]}</td>
        <td className="px-4 py-4 text-center border-2 border-slate-500">
        <div className="flex gap-6 justify-center">

            <FontAwesomeIcon className="text-blue-500 active:text-white"
                icon={faPenToSquare} onClick={() => setIsOpen(true)}/>
            <FontAwesomeIcon className="text-red-500 active:text-white"
                icon={faTrashCan} onClick={() => setIsDelete(true)} />
            

            {isDelete && 
                <div ref={delRef} className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] 
                    translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg'>
                    <h1 className='text-slate-700 font-semibold text-[1.2rem] text-center'>Are you sure?</h1>
                    <div className='bg-cya-300 flex gap-4'>
                    <button className='bg-slate-500 text-white px-2 py-[.2rem] rounded-md active:scale-110'
                        onClick={() => setIsDelete(false)}>Cancel</button>
                    <button className='bg-red-500 text-white px-2 py-[.2rem] rounded-md active:scale-110'
                        onClick={deleteUser}>Delete</button>
                    </div>
                </div>
            }


            {/* EDIT FORM */}
            {isOpen && 
                <form ref={ref} onSubmit={handleUpdate} className="bg-slate-300 w-[35%] absolute z-10 flex flex-col pt-[.8rem] 
                px-[3rem] top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">

                    <FontAwesomeIcon className="absolute text-[1.5rem] right-4 
                    top-2 font-bold hover:scale-110 active:scale-100" 
                        icon={faClose}
                        onClick={() => {
                            setIsOpen(false);
                            setIsEmailExist(false);
                            setIsUserIdExist(false);
                        }}
                    />
                    
                    <div className="bg-blu-200 ml-[-2rem] mb-4">
                        <p className="font-semibold text-[1.1rem] text-start">Edit User</p>
                    </div>

                    <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                        <div className="bg-purpl-200 flex flex-col gap-4">

                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">User ID:</label>
                            <Input 
                                type="text" 
                                className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                required={true}
                                name="studentId"
                                value={updateData.studentId}
                                onChange={(e) => handleInputChange(e, setUpdateData)}
                            />
                        </div>
                        {isUserIdExist && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
                        ml-2 text-start mt-[-1rem]">UserID already exist!</p>}
                        {isValidIDFormat && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 ml-2 text-start mt-[-1rem]">
                            {role === 'student' ? 'Invalid format! (eg. 1234-12345)' : 'Invalid format! (eg. 1234)'}
                        </p>}

                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">First Name:</label>
                            <Input 
                                type="text" 
                                className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                required={true}
                                name="firstName"
                                value={updateData.firstName}
                                onChange={(e) => handleInputChange(e, setUpdateData)}
                            />
                        </div>
                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">Last Name:</label>
                            <Input 
                                type="text" 
                                className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                required={true}
                                name="lastName"
                                value={updateData.lastName || ''}
                                onChange={(e) => handleInputChange(e, setUpdateData)}
                            />
                        </div>
                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">Email:</label>
                            <Input 
                                type="email" 
                                className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                required={true}
                                name="email"
                                value={updateData.email || ''}
                                onChange={(e) => handleInputChange(e, setUpdateData)}
                            />
                            {isEmailExist && <p className="text-[.8rem] font-semibold text-red-500 ml-2 text-start">
                                Email already registered!</p>}
                        </div>
                        {/* <div className={`bg-gree-300 flex flex-col ${isEmailExist && 'mt-[-1rem]'}`}>
                            <label className="font-semibold text-start">Phone Number:</label>
                            <Input 
                                type="text" 
                                className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                name="phoneNumber"
                                value={updateData.phoneNumber || ''}
                                onChange={(e) => handleInputChange(e, setUpdateData)}
                            />
                        </div> */}
                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">Gender:</label>
                            <CustomSelect
                                className=" border-slate-500 text-[.9rem] font-semibold w-[14rem] 
                                h-[2rem] border-[.01rem] rounded-sm ml-2" 
                                option={optionArray(genderArr, selectedGender)}
                                setValue={setSelectedGender}
                                isSlate={true}
                            />
                        </div>
                        <div className="bg-gree-300 flex flex-col">
                            <label className="font-semibold text-start">Status:</label>
                            <CustomSelect
                                className=" border-slate-500 text-[.9rem] font-semibold w-[14rem] 
                                h-[2rem] border-[.01rem] rounded-sm ml-2"
                                option={user.role === 'student' ? 
                                    optionArray(studentStatus, selectedStatus) : 
                                    optionArray(facultyStatus, selectedStatus)}
                                setValue={(setSelectedStatus)}
                                isSlate={true}
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
        </div>
        </td>
    </tr>
    )
}

export default UserMngRow