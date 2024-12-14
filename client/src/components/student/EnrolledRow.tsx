import { useEffect, useState } from "react";
import { CourseType } from "../../types/types";

type EnrolledCourse = {
  courseTitle: string,
  units: number,
  grade: number | null
}

const EnrolledRow = ({ course, sem } : { course: CourseType, sem: number }) => {

  const [status, setStatus] = useState('');
  const [enrolledCourse, setEnrolledCourse] = useState<EnrolledCourse>({
    courseTitle: '',
    units: -1,
    grade: null
  });

  //Set Course
  useEffect(() => {
    if(course.bsitCurriculum) {
      let { bsitCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseTitle: bsitCurriculum.courseTitle,
        units: bsitCurriculum.units,
        grade: grade
      })
    };

    if(course.bscsCurriculum) {
      let { bscsCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseTitle: bscsCurriculum.courseTitle,
        units: bscsCurriculum.units,
        grade: grade
      })
    };

    if(course.bsisCurriculum) {
      let { bsisCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseTitle: bsisCurriculum.courseTitle,
        units: bsisCurriculum.units,
        grade: grade
      })
    };
    if(course.blisCurriculum) {
      let { blisCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseTitle: blisCurriculum.courseTitle,
        units: blisCurriculum.units,
        grade: grade
      })
    };
    if(course.bsemcCurriculum) {
      let { bsemcCurriculum, grade } = course;
      setEnrolledCourse({ 
        courseTitle: bsemcCurriculum.courseTitle,
        units: bsemcCurriculum.units,
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

  return (
    <tr className='bg-slate-100 hover:bg-slate-200'>
        <td className='px-2 py-2 text-start pl-8 border-2 border-slate-500'>{enrolledCourse.courseTitle}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{enrolledCourse.units}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{sem == 1 ? '1st' : '2nd'}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{enrolledCourse.grade == 0 ? '' : enrolledCourse.grade || ''}</td>
        <td className='px-2 py-2 text-center border-2 border-slate-500'>{status}</td>
    </tr>
  )
}

export default EnrolledRow