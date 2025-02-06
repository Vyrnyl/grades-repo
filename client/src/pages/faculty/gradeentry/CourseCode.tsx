import { useEffect, useState } from "react";
import randomColor from "../../../utils/randomColor";
import CourseSubject from "./CourseSubject";
import useUserStore from "../../../store/useUserStore";
import useFetch from "../../../hooks/useFetch";

type HandledCourse = {
  id: number;
  courseCode: string;
  courseTitle: string;
  units: number;
  createdAt: string;
};

type CourseCodeType = {
  data: HandledCourse;
};

type Program = {
  id: number;
  programCode: string;
  userId: number;
};

const CourseCode = ({ data }: CourseCodeType) => {

  const token = localStorage.getItem("atoken");
  const { userInfo } = useUserStore();

  const date = new Date(data.createdAt);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [handledPrograms, setHandledPrograms] = useState<Program[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  
  //Get Programs
  useEffect(() => {
    const getPrograms = async () => {
      const res = await fetch(
        `http://localhost:8000/faculty/get-specialization`,
        {
          method: "POST",
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userInfo?.id }),
        }
      );
      const data = await res.json();

      if (res.ok && Array.isArray(data)) {
        const programs = data as Program[];
        setPrograms(programs);
      }
    };
    getPrograms();
  }, []);

  //Set HanldedPrograms
  useEffect(() => {
    if (programs.length > 0) setHandledPrograms(programs);
  }, [programs]);



  //ASSIGNED COURSES
  //Get/Set assigned YearBlock
  const yearBlocks = useFetch('faculty/get-program-year', 'POST', JSON.stringify({ userId: userInfo?.id }));
  const [assignedYearBlock, setAssignedYearBlock] = useState<{ id: number, programYearBlock: string, userId: number}[]>([]);

  //Set Assigned YearBlocks
  useEffect(() => {
    if(Array.isArray(yearBlocks.data)) setAssignedYearBlock(yearBlocks.data);
  }, [yearBlocks.data]);

    //Remove assigned duplicate
    const [assigned, setAssigned] = useState<{ id: number, programYearBlock: string, userId: number}[]>([])
    useEffect(() => {
      if(assignedYearBlock.length > 0) setAssigned(assignedYearBlock.filter((item, index) => assignedYearBlock.indexOf(item) === index));
    }, [assignedYearBlock]);

  //Style
  const color = randomColor();

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`${color} cursor-pointer h-[14rem] w-[18rem] flex flex-col text-nowrap overflow-hidden 
                px-[1rem] py-4 gap-2 rounded-md`}
      >
        <h1 className="font-bold text-wrap">{`${data.courseCode} - ${data.courseTitle}`}</h1>
        <hr className="bg-slate-500 h-[.1rem] w-[100%] border-none rounded-lg self-start" />
        <div className="bg-cya-200 flex flex-col mt-6">
          <span className="font-medium">Units: {data.units}</span>
          {/* <span className='font-medium'>Students: 3</span> */}
          <span className="font-medium">
            Created:{` ${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}
          </span>
        </div>
      </div>
      
      {isOpen && (
        <CourseSubject
          className="absolute top-0 left-0"
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          courseCode={data.courseCode}
          programs={handledPrograms}
          assignedYearBlock={assigned}
        />
      )}
    </>
  );
};

export default CourseCode;
