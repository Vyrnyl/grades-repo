import { faClose, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { User } from "../../types/studentTypes"
import { useEffect, useRef, useState } from "react"
import Input from "../shared/components/Input"
import handleInputChange from "../../utils/handleInputChange"
import HandleOutsideClick from "../../utils/HandleOutsideClick"
import CustomSelect from "../faculty/CustomSelect"
import getUppercaseLetters from "../../utils/getUpperCaseLetter"
import removeObjectDuplicate from "../../utils/admin/removeObjectDuplicate"

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

type Program = {
    id: number,
    programCode: string,
    userId: number
}

type Course = {
    id: number,
    courseCode: string,
    userId: number,
    createdAt: string,
    updatedAt: string
}
  

type UserRowProps = {
    user: User,
    setUsers: React.Dispatch<React.SetStateAction<[] | User[]>>,
    reload: boolean,
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const UserRow = ({ user, setUsers, setReload } : UserRowProps) => {
    
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

    const [isEmailExist, setIsEmailExist] = useState(false)
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEmailExist(false);

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
    
            const userData = await res.json();
    
            if(res.ok && userData) {
              setUserData(updatedData);
              setIsOpen(false);
            }
            if(userData.error) {
                setIsEmailExist(true);
            }

            //UPDATE PROGRAMS
            let programCodeData = removeObjectDuplicate(programHandled.map(item => {
                return {...item, userId: user.id}
            }));
            console.log(programCodeData);
            
            const handledRes = await fetch(`${apiUrl}/faculty/update-specialization`, {
                method: 'PUT',
                headers: {
                  'Authorization': token ? token : '',
                  'Content-Type': 'application/json'
              },
                body: JSON.stringify({ data: programCodeData, userId: updatedData.id })
              });
              
            const handledData = await handledRes.json();
            
            if(handledRes.ok && handledData) 
                setHandledPrograms(programCodeData as Program[]);


            //UPDATE COURSES
            let courseData = courseHandled.map(item => {
                return {courseCode: item.courseCode, userId: user.id}
            });
            const handledCourseRes = await fetch(`${apiUrl}/faculty/update-handled`, {
                method: 'PUT',
                headers: {
                  'Authorization': token ? token : '',
                  'Content-Type': 'application/json'
              },
                body: JSON.stringify({ data: courseData, userId: updatedData.id })
              });
            
            const handledCourseData = await handledCourseRes.json();
              
            if(handledCourseRes.ok && handledCourseData) 
                setHandledCourses(courseHandled as Course[]);

            
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

    //UPDATE COURSE/PROGRAM HANDLED

    //SET handled from Server
    const [handledPrograms, setHandledPrograms] = useState<Program[]>([]);
    const [handledCourses, setHandledCourses] = useState<Course[]>([]);

    //Edit Hanlded
    const [selectedProgram, setSelectedProgram] = useState('BS Information Technology');
    const [programHandled, setProgramHandled] = useState<{ programCode: string, userId?: number}[]>([]);
    const [courseHandled, setCourseHandled] = useState<{ courseCode: string, userId?: number }[]>([]);
    

    //Handle Programs Edit
    useEffect(() => {
        const setPrograms = () => {
            setProgramHandled(prev => [...prev, { programCode: getUppercaseLetters(selectedProgram) }]);
        }
        
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest(".selected")) {
                setPrograms();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [selectedProgram]);

    //Handle Edit Courses
    const [courseInput, setCourseInput] = useState<string>('');

    const handelAddCourse = () => {
        if(!courseHandled.some(item => item.courseCode === courseInput.trim()) && courseInput.trim() !== '') {
            setCourseHandled(prev => [...prev, {courseCode: courseInput.trim()}]);
            setCourseInput('');
        }
    }


    //DELETE Program
    const handleDeleteProgram = (item: { programCode: string, userId?: number}) => {
        setProgramHandled(prev => {
            return prev.filter(prog => prog.programCode !== item.programCode)
        });
    }
    


    //GET/SET ALL HANDLED
    const [fetchedData, setFetchedData] = useState<Program[]>([]);
    const [fetchedCourses, setFetchedCourses] = useState<Course[]>([]);

    useEffect(() => {
        const getHandledPrograms = async () => {
            try {
                const res = await fetch(`${apiUrl}/faculty/get-specialization`, {
                    method: 'POST',
                    headers: {
                    'Authorization': token ? token : '',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({ userId: user.id })
                });
                
                const data = await res.json();
    
                if(res.ok && data) {
                    const fetchData = data as Program[];
                    setHandledPrograms(fetchData);
                    setProgramHandled(fetchData.map(item => ({ programCode: item.programCode })));
                    setFetchedData(fetchData);

                    // if(data.length === 0) setReload(prev => !prev);
                }
                
                
            } catch(error) {
                console.log('Request Error');
            }
        }

        const getHandledCourses = async () => {
            try {
                const res = await fetch(`${apiUrl}/faculty/get-handled`, {
                    method: 'POST',
                    headers: {
                    'Authorization': token ? token : '',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({ userId: user.id })
                });
                
                const data = await res.json();
    
                if(res.ok && data) {
                    setHandledCourses(data);
                    setCourseHandled(data);
                    setFetchedCourses(data);

                    // if(data.length === 0) setReload(prev => !prev);
                }
                // console.log(data)
                
            } catch(error) {
                console.log('Request Error');
            }
        }

        getHandledPrograms();
        getHandledCourses();
    }, []);
    
    //UPDATE ALL HANDLED


    //Style
    const ref = useRef<HTMLFormElement>(null);
    HandleOutsideClick(ref, setIsOpen);
    
    const delRef = useRef<HTMLDivElement>(null);
    HandleOutsideClick(delRef, setIsDelete);

    return (
        <tr className="bg-slate-100 hover:bg-slate-200 ">
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.studentId}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${userData.firstName}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{userData.lastName}</td>
            <td className="px-2 py-4 text-center border-2 border-slate-500">{userData.email}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500 truncate max-w-[8rem]">
                {handledPrograms.length > 0 ? handledPrograms.map(item => item.programCode).join(', ') : ''}
            </td>
            <td className="px-4 py-4 text-center border-2 border-slate-500 truncate max-w-[10rem]">
                {handledCourses.length > 0 ? handledCourses.map(item => item.courseCode).join(', ') : ''}
            </td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">
                <div className="flex gap-6 justify-center">
                    {isOpen && 
                        <form ref={ref} onSubmit={handleUpdate} className="bg-slate-300 w-[35%] absolute z-10 flex flex-col pt-[.8rem] 
                        px-[3rem] top-[51%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">
                            
                            <FontAwesomeIcon className="absolute text-[1.5rem] right-4
                            top-2 font-bold hover:scale-110 active:scale-100" 
                                icon={faClose} 
                                onClick={() => {
                                    setIsOpen(false);
                                    setUpdateData({
                                        id,
                                        studentId,
                                        firstName,
                                        lastName,
                                        email,
                                        role,
                                        sex,
                                        status
                                    });
                                    setProgramHandled(fetchedData);
                                    setCourseHandled(fetchedCourses);
                                    setIsEmailExist(false);
                                }

                            }
                            />

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
                                            value={updateData.studentId}
                                            onChange={(e) => handleInputChange(e, setUpdateData)}
                                            name="studentId"
                                            />
                                    </div>
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
                                        {isEmailExist && <p className="text-[.8rem] text-red-500 ml-2 text-start">
                                            Email already registered!
                                        </p>}
                                    </div>

                                    <div className={`bg-cya-300 flex flex-col max-w-[15rem] ${isEmailExist && 'mt-[-1rem]'}`}>
                                        <label className="font-semibold text-start">Area of Specialization:</label>
                                        <CustomSelect 
                                            className="cursor-pointer border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
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
                                            {removeObjectDuplicate(programHandled).map((item, i) => {
                                                return <div key={i} className="bg-pin-200 flex gap-2 h-[1.5rem]">
                                                <span className="text-center">{item.programCode}</span>
                                                <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                                icon={faClose} onClick={() => handleDeleteProgram(item)}/>
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    <div className="bg-gree-300 flex flex-col relative max-w-[15rem]">
                                        <label className="font-semibold text-start">Course Subjects Handled:</label>
                                        <Input
                                            type="text" 
                                            className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                            onChange={(e) => setCourseInput(e.target.value)}
                                            value={courseInput}/>
                                            <button type="button" className="bg-[#60e0cf] rounded-r-md border-[.08rem] border-slate-700 
                                            w-[3rem] h-[2rem] font-semibold text-[.8rem] px-2 py-[.5rem] active:text-white 
                                            absolute top-[1.5rem] right-[-4%] grid place-content-center" onClick={handelAddCourse}>Add</button>

                                            {/* SELECTED */}
                                            <div className="bg-blu-200 max-h-[5rem] text-[.9rem] text-slate-700 font-semibold mt-2 
                                            flex flex-wrap gap-2 gap-x-4 overflow-y-auto">
                                                {courseHandled.map((item, i) => {
                                                    return <div key={i} className="bg-pin-200 flex gap-2 h-[1.5rem]">
                                                    <span className="text-center">{item.courseCode}</span>
                                                    <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                                                    icon={faClose}
                                                    onClick={() => setCourseHandled(prev => prev.filter(course => course.courseCode !== item.courseCode))}/>
                                                </div>
                                                })}
                                            </div>
                                        </div>

                                </div>
                            </div>
                            <div className="bg-gree-200 flex justify-end items-start mt-6 mb-4">
                                <div className="bg-re-200 flex gap-4">
                                    {/* <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-2 py-[.5rem] 
                                    active:text-white" type="button">Cancel</button> */}

                                    <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-4 py-[.5rem] 
                                    active:text-white" type="submit" onClick={() => setReload(false)}>Save</button>
                                </div>
                            </div>
                        </form>
                    }

                    <FontAwesomeIcon className="text-blue-500 active:text-white" 
                        icon={faPenToSquare} onClick={() => setIsOpen(!isOpen)}/>
                    <FontAwesomeIcon className="text-red-500 active:text-white" 
                        icon={faTrashCan} onClick={() => setIsDelete(!isDelete)}/>

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
                </div>
            </td>
        </tr>
    )
}

export default UserRow