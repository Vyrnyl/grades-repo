import { faCalendar, faLocationPin, faClock, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import randomColor from "../../../utils/randomColor"
import { useState } from "react"
import PageContainer from "./PageContainer"
import CourseRow from "../../faculty/CourseRow"
import CourseInput from "../../faculty/CourseInput"
import handleInputChange from "../../../utils/handleInputChange"
import { CourseData, CourseInfo } from "../../../types/types"
import { User } from "../../../types/studentTypes"


const ClassSched = ({ classInfo, students } : { classInfo: CourseData, students: User[] }) => {
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { id, courseCode, courseTitle, day, time, room} = classInfo;
    const [courseInfo, setCourseInfo] = useState<CourseInfo>({
        courseCode,
        courseTitle,
        day,
        time,
        room
    });


    //Update CourseInfo
    const handleSave = async () => {

        setIsSave(true);

        const updatedData = {
            id,
            courseCode: courseInfo.courseCode,
            courseTitle: courseInfo.courseTitle,
            day: courseInfo.day,
            time: courseInfo.time,
            room: courseInfo.room
        }
        
        try {
            const res = await fetch(`${apiUrl}/class/update-class`, {
              method: 'PUT',
              headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
              body: JSON.stringify(updatedData)
            });
            
            const data = await res.json();

            if(res.ok && data.message) {

                setCourseInfo({
                    courseCode: updatedData.courseCode,
                    courseTitle: updatedData.courseTitle,
                    day: updatedData.day,
                    time: updatedData.time,
                    room: updatedData.room
                });

                setIsEditOpen(false);
                setSave('Saved!');
                setTimeout(() => {
                    setIsSave(false);
                }, 700);
            }
            
          } catch(error) {
            console.log("Update error" + error);
          }

    }


    //Delete CourseInfo
    const [isDelete, setIsDelete] = useState(false);

    const deleteCourseInfo = async () => {
        setIsDelete(false);
        try {
            const res = await fetch(`${apiUrl}/class/delete-class`, {
                method: 'DELETE',
                headers: {
                'Authorization': token ? token : '',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ classId: classInfo.id })
            });

            const data = await res.json();

            if(res.ok && data.message) {
                window.location.reload();
            }
            console.log(data)

        } catch(error) {
            console.log('Request Error');
        }
    }

    //Style
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [save, setSave] = useState('Saving');
    const color = randomColor();

    const handleCancel = () => {
        setIsEditOpen(false);
        setIsCourseOpen(false)
        setIsDelete(false);
    }

    return (
        <div>
            <div onClick={() => setIsCourseOpen(true)} className={`${color} h-[11rem] w-[13rem] flex flex-col text-nowrap overflow-hidden 
                px-[1rem] py-4 gap-2 rounded-md class-shadow`}>
                <h1 className="font-bold">{courseInfo.courseCode}</h1>
                <hr className='bg-slate-500 h-[.1rem] w-[100%] border-none rounded-lg self-start'/>
                <div className="flex bg-cya-200 items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar}/>
                    <p>{courseInfo.day}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock}/>
                    <p>{courseInfo.time}</p>
                </div>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationPin}/>
                    <p>{courseInfo.room}</p>
                </div>
            </div>

            {/* CourseDetails */}
            {isCourseOpen && 
                <PageContainer className='bg-re-300 absolute w-[100%] h-[103%] flex flex-col px-10 top-[50%] right-0 z-10 
                translate-y-[-50%]'>
                    <div className='bg-cya-200 flex flex-col flex-[.2] justify-center gap-4'>
                        <h1 className="text-[1.5rem] font-semibold text-slate-700 ">Course Details</h1>
                        <ul className='bg-gree-200 flex text-[.95rem] font-semibold text-slate-700 h-[3rem] overflow-hidden'>
                            {!isEditOpen ? 
                                <>
                                    <li className='flex text-center items-center flex-[.7] px-2 border-l-2 border-y-2
                                    border-slate-500'>Course Code: {courseInfo.courseCode}</li>

                                    <li className='flex text-center items-center justify-center
                                    flex-1 px-2 border-l-2 border-y-2 border-slate-500'>Course Title: {courseInfo.courseTitle}</li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.8] border-l-2 border-y-2 border-slate-500'>Day: {courseInfo.day}</li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.6] border-l-2 border-y-2 border-slate-500'>Time: {courseInfo.time}</li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.4] border-l-2 border-y-2 border-slate-500'>Room: {courseInfo.room}</li>
                                </> : 
                                <>
                                    <li className='flex text-center items-center flex-[.7] px-2 border-l-2 border-y-2
                                    border-slate-500'>
                                        <CourseInput name="courseCode" 
                                            value={courseInfo.courseCode} 
                                            onChange={(e) => handleInputChange(e, setCourseInfo)}/>
                                    </li>

                                    <li className='flex text-center items-center justify-center
                                    flex-1 px-2 border-l-2 border-y-2 border-slate-500'>
                                        <CourseInput name="courseTitle" 
                                            value={courseInfo.courseTitle}
                                            onChange={(e) => handleInputChange(e, setCourseInfo)}/>
                                    </li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.8] border-l-2 border-y-2 border-slate-500'>
                                        <CourseInput name="day" 
                                            value={courseInfo.day}
                                            onChange={(e) => handleInputChange(e, setCourseInfo)}/>
                                    </li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.6] border-l-2 border-y-2 border-slate-500'>
                                        <CourseInput name="time" 
                                            value={courseInfo.time}
                                            onChange={(e) => handleInputChange(e, setCourseInfo)}/>
                                    </li>

                                    <li className='flex text-center items-center justify-center px-2 
                                    flex-[.4] border-l-2 border-y-2 border-slate-500'>
                                        <CourseInput name="room" 
                                            value={courseInfo.room}
                                            onChange={(e) => handleInputChange(e, setCourseInfo)}/>
                                    </li>                                    
                                </>
                            }
                            <li className='flex text-center items-center justify-center px-2 
                            flex-[.4] border-x-2 border-y-2 border-slate-500 gap-4'>
                                <FontAwesomeIcon className="text-blue-500 active:text-white" 
                                    icon={faPenToSquare} onClick={() => setIsEditOpen(!isEditOpen)}/>
                                <FontAwesomeIcon className="text-red-500 active:text-white" 
                                    icon={faTrashCan} onClick={() => setIsDelete(true)}/>
                            </li>
                            
                        </ul>
                    </div>

                    <div className='bg-re-200 flex-[.65] px-4 mt-8 mb-[1rem] overflow-y-scroll'>
                        <table className="w-full font-semibold text-white">
                            <thead className="bg-blue-500 sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 py-4 text-center w-[10rem]">Student ID</th>
                                    <th className="px-4 py-4 text-center min-w-[8rem]">Name</th>
                                    <th className="px-4 py-4 text-center w-[15rem]">Course/Year/Block</th>
                                    <th className="px-4 py-4 text-center w-[15rem]">Gender</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {
                                    students.map((student, i) => {
                                        return  <CourseRow key={i} student={student}/>;
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='bg-purpl-300 flex-[.15] flex justify-end px-4'>
                        <div className='flex gap-4'>
                            <button onClick={handleCancel} className='bg-blue-500 font-medium p-2 rounded-md 
                            w-[4rem] h-[2rem] flex justify-center items-center active:text-white'>Cancel</button>
                            <button onClick={handleSave} className='bg-blue-500 font-medium p-2 rounded-md 
                            w-[4rem] h-[2rem] flex justify-center items-center active:text-white'>Save</button>
                        </div>
                    </div>
                </PageContainer>
            }

            {isSave && 
                <div className="bg-white h-[4rem] px-4 flex items-center absolute left-[50%] top-[50%] 
                translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg z-10">
                <h1 className="text-[1.2rem] font-semibold text-slate-700 ">{save}</h1>
                </div>
            } 
            {isDelete && 
                <div className='bg-slate-300 absolute px-8 py-10 left-[50%] top-[50%] z-10  
                    translate-y-[-50%] translate-x-[-50%] flex flex-col gap-4 rounded-lg'>
                    <h1 className='text-slate-700 font-semibold text-[1.2rem] text-center'>Are you sure?</h1>
                    <div className='bg-cya-300 flex gap-4'>
                    <button className='bg-slate-500 text-white px-2 py-[.2rem] rounded-md'
                        onClick={() => setIsDelete(false)}>Cancel</button>
                    <button className='bg-red-500 text-white px-2 py-[.2rem] rounded-md'
                        onClick={deleteCourseInfo}>Delete</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ClassSched