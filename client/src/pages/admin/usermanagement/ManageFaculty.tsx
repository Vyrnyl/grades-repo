import { useEffect, useState } from "react";
import UserRow from "../../../components/admin/UserRow";
import useFetch from "../../../hooks/useFetch";
import Input from "../../../components/shared/components/Input";
import CustomSelect from "../../../components/faculty/CustomSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../types/studentTypes";
import getUppercaseLetters from "../../../utils/getUpperCaseLetter";
import removeObjectDuplicate from "../../../utils/admin/removeObjectDuplicate";
import { AddedCourseType } from "../../../types/types";
import CourseNotExistPrompt from "../../../components/admin/smallComps/CourseNotExistPrompt";
import isFacIDValid from "../../../utils/isFacIDValid";

type AddData = {
  studentId: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string
}

const ManageFaculty = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { data } = useFetch('user/get-users', 'GET');
    const [users, setUsers] = useState<User[]>([]);
    
    useEffect(() => {
      if(Array.isArray(data)) {
          const list = data.filter((d) => d.role === 'faculty');
          setUsers(list);
      }
    }, [data]);
    
    
    //Add
    const [isEmailExist, setIsEmailExist] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [addData, setAddData] = useState<AddData>({
      studentId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: ''
    });
    
    const handleAddData = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddData({...addData, [e.target.name]: e.target.value});
    }
    
    
    //FACULTY HANDLED
    const [programHandled, setProgramHandled] = useState<{ programCode: string, userId?: number}[]>([]);
    const [courseHandled, setCourseHandled] = useState<{ courseCode: string, userId?: number }[]>([]);
    
    const [selectedProgram, setSelectedProgram] = useState('BS Information Technology');
    const [courseInput, setCourseInput] = useState<string>('');
    
    

    //SET Programs
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


    //SET Courses
    const [courseList, setCourseList] = useState<AddedCourseType[]>([]);
    const courses = useFetch(`program/get-added-courses`, 'GET');
    const [isNotExist, setIsNotExist] = useState(false);

    //Set List
    useEffect(() => {
      if(courses.data) setCourseList(courses.data as AddedCourseType[]);
    }, [courses.data]);

    const handelAddCourse = () => {
      if(courseList.some(item => item.courseCode === courseInput)) {
        if(!courseHandled.some(item => item.courseCode === courseInput.trim()) && courseInput.trim() !== '') {
            setCourseHandled(prev => [...prev, {courseCode: courseInput.trim()}]);
            setCourseInput('');
            setIsNotExist(false);
        };
      } else if(courseInput.trim() !== '') setIsNotExist(true);
    }
    
    
    //Remove selected program
    const handleDeleteProgram = (item: { programCode: string, userId?: number}) => {
      setProgramHandled(prev => {
        return prev.filter(prog => prog.programCode !== item.programCode)
      });
    }

    
    //SUBMIT
    const [isUserIdExist, setIsUserIdExist] = useState(false);
    const [isValidIDFormat, setIsValidIDFormat] = useState(false);

    const handleFormSubmit = (e: React.FormEvent) => {

      e.preventDefault();
      setIsEmailExist(false);
      setIsUserIdExist(false);
      setIsValidIDFormat(false);
      
      let pw = `${addData.firstName.charAt(0).toLocaleLowerCase()}${addData.firstName.slice(1)}123`;
      
      if(pw.split(' ').length > 1) {
        let secName = pw.split(' ')[1];
        pw = `${pw.split(' ')[0]}${secName.charAt(0).toLocaleLowerCase()}${secName.slice(1)}`;
      }

      let body = {
        ...addData, 
        programId: 1,
        role: 'faculty',
        password: pw,
        confirmPassword: pw,
        status: 'Active'
      };
      
      const addUser = async () => {
        
        const res = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const data = await res.json();
        
        if(res.ok && data) {
          let programCode = selectedProgram.replace(/\s+/g, '').split('').filter(char => char === char.toUpperCase()).join('');
          setUsers([...users, {...data, program: { programCode }}]);
          setIsAddOpen(false);
          setSelectedProgram('BS Information Technology');
          

          let programCodeData = removeObjectDuplicate(programHandled.map(item => {
            return {...item, userId: data.id}
          }));
          

          //ASSIGNED
          //Add Programs
          const addSpecialization = async () => {
            
            const res = await fetch(`${apiUrl}/faculty/add-specialization`, {
              method: 'POST',
              headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ data: programCodeData })
            });
            const data: any = await res.json();
            
            if(res.ok && data) setProgramHandled([]);
          }

          let courseData = courseHandled.map(item => {
            return {...item, userId: data.id}
          });
          
          //Add Courses
          const addCourses = async () => {
            const res = await fetch(`${apiUrl}/faculty/add-handled`, {
              method: 'POST',
              headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ data: courseData })
            });
            const data: any = await res.json();
            
            if(res.ok && data) setCourseHandled([]);
          }

          //Add Handled YearBlock
          const addProgYear = async () => {
            let programYearBlockData = programYearHandled.map(({ id, ...rest }) => rest);
            
            const handleProgramYearRes = await fetch(`${apiUrl}/faculty/update-program-year`, {
                method: 'PUT',
                headers: {
                  'Authorization': token ? token : '',
                  'Content-Type': 'application/json'
              },
                body: JSON.stringify({ data: programYearBlockData.map(item => 
                  ({ programYearBlock: item.programYearBlock, userId: data.id })), userId: data.id })
              });
              
            const programYearData = await handleProgramYearRes.json();

            if(programYearData) setProgramYearHandled([]);
          }

          addSpecialization();
          addCourses();
          addProgYear();

          // window.location.reload();
        };
        

        if(res.status === 409 && data.error.split(' ')[0] === 'UserID') {
          setTimeout(() => {
              setIsUserIdExist(true);
          }, 100);
        }
        if(data.error && data.error.split(' ')[0] === 'Email') setIsEmailExist(true);
          
      }
      
      if(isFacIDValid(body.studentId)) 
        addUser();
      else setTimeout(() => {
          setIsValidIDFormat(true);
          setIsUserIdExist(false);
      }, 100);
      
    }
    
    const [reload, setReload] = useState(false);


    //YearLevel/Block handled
    const [selectedProgramYr, setSelectedProgramYr] = useState('BSIT-1-A');
    const [programYearHandled, setProgramYearHandled] = useState<{ id?: Number, programYearBlock: string, userId?: number }[]>([]);

    //Set ProgYear Dropdown
    const [progYearArr, setProgYearArr] = useState<string[]>([]);
    const blocks = ['A', 'B', 'C', 'D'];
    
    useEffect(() => {
        setProgYearArr([]);

        let array = removeObjectDuplicate(programHandled);
        
        array.forEach(item => {
            for (let i = 1; i <= 4; i++) {
                for (let j = 0; j < 4; j++) {
                    setProgYearArr(prev => [...prev, `${item.programCode}-${i}-${blocks[j]}`]);
                }
            }
        });
        
        if(array.length > 0) setSelectedProgramYr(array[0].programCode);
    }, [programHandled]);


    //Handle Programs Edit
    useEffect(() => {

      //Programs
      const setPrograms = () => {
          if(selectedProgramYr !== 'Select') 
            setProgramHandled(prev => [...prev, { programCode: getUppercaseLetters(selectedProgram) }]);
      }
      
      const handleClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (target.closest(".progName")) {
              setPrograms();
          }
      };

      document.addEventListener("click", handleClick);

      return () => {
          document.removeEventListener("click", handleClick);
      };
    }, [selectedProgram]);
    

    useEffect(() => {
        //ProgramYear
        const setProgramsYear = () => {
            if(!programYearHandled.some(item => item.programYearBlock === selectedProgramYr))
                setProgramYearHandled(prev => [...prev, { programYearBlock: selectedProgramYr } ]);
        }
        
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest(".progYear")) {
                setProgramsYear();
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [selectedProgramYr]);


    //Paginition
    const [entries, setEntries] = useState<User[]>([]);
    
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);
    
    useEffect(() => {
      setEntries(users.slice(start, end));
    }, [start, end, users]);

    const handleNext = () => {
      if(entries.length % 6 === 0) {
        setStart(prev => prev + 6);
        setEnd(prev => prev + 6);
      }
    }
    const handlePrev = () => {
      if(start >= 6){
        setStart(prev => prev - 6);
        setEnd(prev => prev - 6);
      }
    }



    return (
      <div className='bg-cya-100 h-[98%] flex flex-col gap-2 flex-[80%] 
      rounded-lg px-10 py-6 shadow-pageComponentShadow relative'>
        
        <div className="bg-gree-300 flex flex-[10%]">
          <h1 className="text-[2rem] font-semibold text-slate-800 self-center">Manage Faculty</h1>
        </div>
        
        <button className="bg-blue-500 rounded-md self-end font-semibold text-[1.1rem] px-6 py-[.5rem] 
        mb-4 text-white active:scale-[103%]" onClick={() => setIsAddOpen(prev => !prev)}>Add Faculty</button>
  
        <div className="bg-re-300 flex-[90%] mb-[1rem] overflow-y-scroll">
          <table className="w-full font-semibold text-white">
            <thead className="bg-blue-500 sticky text-slate-800 top-0 z-10">
                <tr className="text-white">
                    <th className="px-4 py-4 text-center border-l-2 border-blue-500 min-w-[5rem]">Faculty ID</th>
                    <th className="px-4 py-4 text-center min-w-[8rem]">First Name</th>
                    {/* <th className="px-4 py-4 text-center min-w-[8rem]">Middle Name</th> */}
                    <th className="px-4 py-4 text-center min-w-[8rem]">Last Name</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Email</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Area Of Specialization</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">Course Subjects Handled</th>
                    <th className="px-4 py-4 text-center min-w-[5rem]">YearLevel Handled</th>
                    <th className="px-4 py-4 text-center border-r-2 border-blue-500 min-w-[5rem]">Action</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
              {entries.map((user) => <UserRow 
                key={user.id}
                user={user}
                setUsers={setUsers}
                reload={reload}
                setReload={setReload}
              />)}
            </tbody>
          </table>
          <div className="bg-slate-200 flex justify-between mt-4 absolute w-[84%] bottom-[2rem]">
            <span className="font-semibold text-[.9rem] self-center">Showing {entries.length} entries</span>
            <div className="bg-blu-200">
              <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
              border-2 border-slate-700 px-10 py-2" onClick={handlePrev}>Previous</button>
              <button className="text-[1rem] active:scale-[98%] text-slate-700 font-semibold 
              border-r-2 border-y-2 border-slate-700 px-12 py-2" onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
  
        
  
        
  
        
        {/* ADD FORM */}
        {isAddOpen && 
          <form onSubmit={handleFormSubmit} className="bg-slate-300 w-[35% absolute z-10 flex flex-col pt-[.8rem] 
          px-[3rem] top-[46%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">
            
            <FontAwesomeIcon className="absolute text-[1.5rem] right-4
            top-2 font-bold hover:scale-110 active:scale-100" icon={faClose} 
            onClick={() => {
              setIsAddOpen(false);
              setProgramHandled([]);
              setCourseHandled([]);
              setIsEmailExist(false);
              setProgramYearHandled([]);
              setIsUserIdExist(false);
              setIsValidIDFormat(false);
            }}/>

            <div className="bg-blu-200 ml-[-2rem] mb-4">
              <p className="font-semibold">Add Faculty</p>
            </div>
            
            <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
              <div className="bg-purpl-200 flex gap-x-10">
                
                <div className="flex flex-col gap-4">
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Faculty ID:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="studentId"
                      />
                  </div>
                  {isUserIdExist && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
                  ml-2 text-start mt-[-0.5rem]">UserID already exist!</p>}
                    {isValidIDFormat && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
                    ml-2 text-start mt-[-0.5rem]">
                      Invalid format! (eg. 1234)
                  </p>}

                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">First Name:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="firstName"
                      />
                  </div>
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Middle Name:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        onChange={handleAddData}
                        name="middleName"
                      />
                  </div>
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Last Name:</label>
                    <Input 
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="lastName"
                      />
                  </div>
                  <div className="bg-gree-300 flex flex-col">
                    <label className="font-semibold">Email:</label>
                    <Input 
                        type="email" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        required={true}
                        onChange={handleAddData}
                        name="email"
                      />
                    {isEmailExist && <p className="text-[.8rem] font-semibold text-red-500 ml-2 mb-2">Email already registered!</p>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className={`bg-gree-300 flex flex-col max-w-[15rem] ${isEmailExist && 'mt-[-1rem]'}`}>
                    <label className="font-semibold">Area of Specialization:</label>
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
                      x="progName"
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

                  <div className={`bg-cya-300 flex flex-col max-w-[15rem] ${isEmailExist && 'mt-[-1rem]'}`}>
                    <label className={`font-semibold text-start ${programHandled.length === 0 && 'text-slate-400'}`}>Year/Block Handled:</label>
                    {programHandled.length > 0 ? 
                      <CustomSelect 
                        className="cursor-pointer border-slate-500 text-[.8rem] 
                        font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2" 
                        option={progYearArr.length > 0 ? progYearArr : ['Select']}
                        setValue={setSelectedProgramYr}
                        x="progYear"
                      /> : 
                      <div className="border-slate-400 text-[1rem] text-slate-400 items-center flex px-[1rem]
                        font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2">Select</div>
                    }
    
                    {/* SELECTED */}
                    <div className="bg-blu-200 max-h-[3rem] text-[.9rem] text-slate-700 font-semibold mt-2 
                    flex flex-wrap gap-2 gap-x-4 overflow-y-auto">
                        {programYearHandled.map((item, i) => {
                            return <div key={i} className="bg-pin-200 flex gap-2 h-[1.5rem]">
                            <span className="text-center">{item.programYearBlock}</span>
                            <FontAwesomeIcon className="text-[.8rem] right-[-2rem] top-4 font-bold hover:scale-110 active:scale-100" 
                            icon={faClose} onClick={() => setProgramYearHandled(prev => prev.filter(progYr => progYr.programYearBlock !== item.programYearBlock))}/>
                            </div>
                        })}
                    </div>
                  </div>
                  
                  <div className="bg-gree-300 flex flex-col relative max-w-[15rem]">
                    <label className="font-semibold">Course Subjects Handled:</label>
                    <Input
                        type="text" 
                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                        onChange={(e) => setCourseInput(e.target.value)}
                        
                        value={courseInput}
                      />
                      <button type="button" className="bg-[#60e0cf] rounded-r-md border-[.08rem] border-slate-700 
                      w-[3rem] h-[2rem] font-semibold text-[.8rem] px-2 py-[.5rem] active:text-white 
                      absolute top-[1.5rem] right-[-4%] grid place-content-center" onClick={handelAddCourse}>Add</button>

                      {/* SELECTED */}
                      <div className="bg-blu-200 max-h-[3rem] text-[.9rem] text-slate-700 font-semibold mt-2 
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
            </div>

            <div className="bg-gree-200 flex justify-end items-start mt-6 mb-4">
              <div className="bg-re-200 flex gap-4">
                <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-2 py-[.5rem] 
                 active:text-white" 
                 onClick={() => {
                  setIsAddOpen(false); 
                  setProgramHandled([]);
                  setCourseHandled([]);
                  setProgramYearHandled([]);
                }} type="button">Cancel</button>

                <button className="bg-[#60e0cf] rounded-md font-semibold text-[1rem] px-4 py-[.5rem] 
                 active:text-white" type="submit" >Add</button>
              </div>
            </div>
          </form>
        }


        {/* Error Prompt */}
        {isNotExist && <CourseNotExistPrompt setIsNotExist={setIsNotExist} courseCode={courseInput}/>}
      </div>
    )
}

export default ManageFaculty