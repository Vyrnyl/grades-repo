import { useEffect, useState } from "react";
import { CourseType } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { User } from "../../types/studentTypes";
import { ProgramYear } from "../../types/admin/manageFacultyTypes";

type HandledCourse = { 
  id: number,
  courseCode: string,
  userId: number,
  createdAt: string,
  updatedAt: string
}

type EnrolledCourse = {
  courseCode: string,
  courseTitle: string,
  units: number,
  grade: number | null
}

const EnrolledRow = ({ course, sem, user } : { course: CourseType, sem: number, user: User | null }) => {

  const [status, setStatus] = useState('');
  const [enrolledCourse, setEnrolledCourse] = useState<EnrolledCourse>({
    courseCode: '',
    courseTitle: '',
    units: -1,
    grade: null
  });

  // console.log(enrolledCourse)

  //Set Course
  useEffect(() => {
    if(course.bsitCurriculum) {
      let { bsitCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseCode: bsitCurriculum.courseCode,
        courseTitle: bsitCurriculum.courseTitle,
        units: bsitCurriculum.units,
        grade: grade
      })
    };

    if(course.bscsCurriculum) {
      let { bscsCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseCode: bscsCurriculum.courseCode,
        courseTitle: bscsCurriculum.courseTitle,
        units: bscsCurriculum.units,
        grade: grade
      })
    };

    if(course.bsisCurriculum) {
      let { bsisCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseCode: bsisCurriculum.courseCode,
        courseTitle: bsisCurriculum.courseTitle,
        units: bsisCurriculum.units,
        grade: grade
      })
    };
    if(course.blisCurriculum) {
      let { blisCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseCode: blisCurriculum.courseCode,
        courseTitle: blisCurriculum.courseTitle,
        units: blisCurriculum.units,
        grade: grade
      })
    };
    if(course.bsemcCurriculum) {
      let { bsemcCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseCode: bsemcCurriculum.courseCode,
        courseTitle: bsemcCurriculum.courseTitle,
        units: bsemcCurriculum.units,
        grade: grade
      })
    };
    if(course.addedCourse) {
      let { addedCourse, grade } = course;
      setEnrolledCourse({ 
        courseCode: addedCourse.courseCode,
        courseTitle: addedCourse.courseTitle,
        units: addedCourse.units,
        grade: grade
      })
    };

  }, [course]);

  //Set status
  useEffect(() => {
    if(enrolledCourse) {
      if(!enrolledCourse.grade) setStatus('');
      if(enrolledCourse.grade && enrolledCourse.grade > 3) setStatus('Failed');
      if(enrolledCourse.grade && enrolledCourse.grade <= 3) setStatus('Passed');
    }
  }, [enrolledCourse]);


  //PROFESSOR NAME
  const [faculty, setFaculty] = useState<User | null>(null);

  const assignedProgYears = useFetch('faculty/get-program-years', 'GET');
  const assignedCourses = useFetch('faculty/get-all-handled', 'GET');
  const users = useFetch('user/get-users', 'GET');

  const [assignedProgYearsList, setAssignedProgYearsList] = useState<ProgramYear[]>([]);
  const [assignedCoursesList, setAssignedCoursesList] = useState<HandledCourse[]>([]);
  const [faculties, setFaculties] = useState<User[]>([]);

  const userCourse = enrolledCourse.courseCode;
  const progYearBlock = `${user?.program.programCode}-${user?.yearLevel}-${user?.block}`;

  //Set Assgined
  useEffect(() => {
    if(Array.isArray(assignedProgYears.data)) setAssignedProgYearsList(assignedProgYears.data);
  }, [assignedProgYears.data]);

  //Set Assigned Courses
  useEffect(() => {
    if(Array.isArray(assignedCourses.data)) 
      setAssignedCoursesList(assignedCourses.data);
  }, [assignedCourses.data]);

  //Set Faculty List
  useEffect(() => {
    if(Array.isArray(users.data)) setFaculties(users.data.filter(user => user.role === 'faculty' && user));
  }, [users.data]);

  //Set Faculty
  useEffect(() => {
    let fac = faculties.find(fac => assignedCoursesList.some(course => 
      course.userId === fac.id && course.courseCode === userCourse) && 
      assignedProgYearsList.some(prog => prog.userId === fac.id && prog.programYearBlock === progYearBlock));
    
      if(fac) setFaculty(fac);
  }, [assignedProgYears.data, assignedCourses.data, users.data]);
  

  return (
    <tr className='bg-slate-100 hover:bg-slate-200'>
        <td className="px-2 py-2 text-start pl-8 border-2 border-slate-500">
          {`${faculty?.firstName || ''} ${faculty?.lastName || ''}`}</td>
        <td className='px-2 py-2 text-start pl-8 border-2 border-slate-500'>{enrolledCourse.courseTitle}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{enrolledCourse.units}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{sem == 1 ? '1st' : '2nd'}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{enrolledCourse.grade == 0 ? '' : 
        (enrolledCourse.grade && (Number.isInteger(Number(enrolledCourse.grade)) ? `${enrolledCourse.grade}.0` : enrolledCourse.grade)) || ''}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{status}</td>
    </tr>
  )
}

export default EnrolledRow