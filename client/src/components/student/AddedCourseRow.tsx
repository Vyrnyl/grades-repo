import React, { useEffect, useRef, useState } from 'react'
import HandleOutsideClick from '../../utils/HandleOutsideClick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Input from '../shared/components/Input';
import { AddedCourseType } from '../../types/types';
import handleInputChange from '../../utils/handleInputChange';
import getProgram from '../../utils/getProgram';
import yearSuffix from '../../utils/yearSuffix';
import CustomSelect from '../faculty/CustomSelect';
import getProgramId from '../../utils/getProgramId';
import optionArray from '../../utils/optionArray';
import getProgramName from '../../utils/getProgramName';
import getUppercaseLetters from '../../utils/getUpperCaseLetter';
import removeObjectDuplicate from '../../utils/admin/removeObjectDuplicate';


type AddedCourse = {
    id: number,
    courseCode: string,
    courseTitle: string,
    units: number,
    yearLevel: number,
    semester: number,
    programId: number
}

const AddedCourseRow = ({ addedCourse, setCourseList, setReload }: { 
    addedCourse: AddedCourseType, 
    setCourseList: React.Dispatch<React.SetStateAction<AddedCourseType[]>>,
    setReload:  React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { id, courseCode, courseTitle, programId, units, yearLevel, semester } = addedCourse;
    const [courseData, setCourseData] = useState<any>
    ({ id, courseCode, courseTitle, programId, units, yearLevel, semester });
    


    //Update
    const [isOpen, setIsOpen] = useState(false);

    const [programArr, setProgramArr] = useState([
        'BS Information Technology', 
        'BS Computer Science', 
        'BS Information Systems',
        'BL Information Science',
        'BS Entertainment and Multimedia Computing'
    ]);
    const [unitsArr, setUnitsArr] = useState(['1', '2', '3','4', '5', '6']);
    const [yearLevelArr, setYearLevelArr] = useState(['1st', '2nd', '3rd', '4th']);
    const [semesterArr, setSemesterArr] = useState(['1st', '2nd']);

    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedUnits, setSelectedUnits] = useState('');
    const [selectedYearLevel, setSelectedYearLevel] = useState('');
    const [selectedSem, setSelectedSem] = useState('');


    
    //SET DROPDOWN VALUES
    useEffect(() => {
        setSelectedProgram(getProgramName(programId));
        setSelectedUnits(String(units));
        setSelectedYearLevel(`${yearLevel}${yearSuffix(yearLevel)}`);
        setSelectedSem(`${semester}${yearSuffix(semester)}`);
    }, [addedCourse]);

    const [updateData, setUpdateData] = useState<Record<string, any>>({
        id, courseCode, courseTitle, programId, units, yearLevel, semester
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        let progIds = programHandled.map(item => getProgramId(item.programCode)).filter((val, i, self) => self.indexOf(val) === i);
        const updatedData = {
            id,
            courseCode: updateData.courseCode,
            courseTitle: updateData.courseTitle,
            programIds: progIds,
            units: Number(selectedUnits),
            yearLevel: Number(selectedYearLevel.charAt(0)),
            semester:  Number(selectedSem.charAt(0))
        }

        const updateUser = async () => {
            
            
            try {
                const res = await fetch(`${apiUrl}/program/update-added-course`, {
                method: 'PUT',
                headers: {
                    'Authorization': token ? token : '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
                });
        
                const data = await res.json();
        
                if(res.ok && data) {
                    setCourseData(updateData);
                    setIsOpen(false);
                }
        
            } catch(error) {
                console.log("Fetch error" + error);
            }
        }
        // updateUser();
    }


    //Delete AddedCourse
    const [isDelete, setIsDelete] = useState(false);

    const deleteUser = async () => {
        setIsDelete(false);
        try {
            const res = await fetch(`${apiUrl}/program/delete-added-course`, {
                method: 'DELETE',
                headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ id: courseData.id })
            });

            const data = await res.json();

            if(res.ok && data) {
                setCourseList(prev => prev.filter(u => u.id !== courseData.id));
                setReload(prev => !prev);
            }
            
        } catch(error) {
            console.log('Request Error');
        }
    }


    //SET SELECTED PROGRAM
    //SET Programs
    const [programHandled, setProgramHandled] = useState<{ programCode: string, userId?: number}[]>([]);

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

    //Remove selected program
    const handleDeleteProgram = (item: { programCode: string, userId?: number}) => {
      setProgramHandled(prev => {
        return prev.filter(prog => prog.programCode !== item.programCode)
      });
    }

    useEffect(() => {
      if(!isOpen) setProgramHandled([]);
    }, [isOpen]);


    //Style
    const ref = useRef<HTMLFormElement>(null);
    HandleOutsideClick(ref, setIsOpen);

    const delRef = useRef<HTMLDivElement>(null);
    HandleOutsideClick(delRef, setIsDelete);
    return (
        <tr className='bg-slate-100 hover:bg-slate-200'>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{courseData.courseCode}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{courseData.courseTitle}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{getProgram(1)}</td>
            <td className="px-2 py-4 text-center border-2 border-slate-500">{courseData.units}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${courseData.yearLevel}${yearSuffix(courseData.yearLevel)}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">{`${courseData.semester}${yearSuffix(courseData.semester)}`}</td>
            <td className="px-4 py-4 text-center border-2 border-slate-500">
                <div className="flex gap-6 justify-center">

                    {/* EDIT FORM */}
                    {isOpen && 
                        <form ref={ref} onSubmit={handleUpdate} className="bg-slate-300 w-[32%] absolute z-10 flex flex-col pt-[.8rem] 
                        px-[3rem] top-[52%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[.4rem]">

                            <FontAwesomeIcon className="absolute text-[1.5rem] right-4 
                            top-2 font-bold hover:scale-110 active:scale-100" 
                                icon={faClose}
                                onClick={() => setIsOpen(false)}
                            />
                            
                            <div className="bg-blu-200 ml-[-2rem] mb-4">
                                <p className="font-semibold text-[1.1rem] text-start">Edit Course</p>
                            </div>

                            <div className="bg-re-200 flex-[.8] flex w-[100%] justify-center gap-[6rem]">
                                <div className="bg-purpl-200 flex flex-col gap-4">

                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Course Code:</label>
                                    <Input 
                                        type="text" 
                                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                        name="courseCode"
                                        value={updateData.courseCode}
                                        onChange={(e) => handleInputChange(e, setUpdateData)}
                                    />
                                </div>
                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Course Title:</label>
                                    <Input 
                                        type="text" 
                                        className="bg-slate-300 border-slate-500 w-[14rem] h-[2rem] rounded-sm ml-2"
                                        name="courseTitle"
                                        value={updateData.courseTitle}
                                        onChange={(e) => handleInputChange(e, setUpdateData)}
                                    />
                                </div>
                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Program:</label>
                                    <CustomSelect
                                        className="cursor-pointer  border-slate-500 text-[.8rem] font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2"
                                        option={optionArray(programArr, selectedProgram)}
                                        setValue={setSelectedProgram}
                                        isSlate={true}
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
                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Units:</label>
                                    <CustomSelect
                                        className="cursor-pointer  border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2"
                                        option={optionArray(unitsArr, selectedUnits)}
                                        setValue={setSelectedUnits}
                                        isSlate={true}
                                    />
                                </div>
                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Year Level:</label>
                                    <CustomSelect
                                        className="cursor-pointer  border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2"
                                        option={optionArray(yearLevelArr, selectedYearLevel)}
                                        setValue={setSelectedYearLevel}
                                        isSlate={true}
                                    />
                                </div>
                                <div className="bg-gree-300 flex flex-col">
                                    <label className="font-semibold text-start">Semester:</label>
                                    <CustomSelect
                                        className="cursor-pointer border-slate-500 font-semibold w-[14rem] h-[2rem] border-[.01rem] rounded-sm ml-2"
                                        option={optionArray(semesterArr, selectedSem)}
                                        setValue={setSelectedSem}
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





export default AddedCourseRow



