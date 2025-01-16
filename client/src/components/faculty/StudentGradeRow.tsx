import { faPenToSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StudentRecord } from "../../types/types";
import { useEffect, useState } from "react";

type StudentGradeRowProps = {
  student: StudentRecord;
  courseId: number;
  courseCode: string;
  closeEdit?: boolean;
  setCloseEdit: (value: React.SetStateAction<boolean>) => void;
};

//HARDCODED
const StudentGradeRow = ({
  student,
  courseId,
  courseCode,
  setCloseEdit,
  closeEdit,
}: StudentGradeRowProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("atoken");

  const [grade, setGrade] = useState<number | null>(null);
  let programCode = "";
  if (student.program) programCode = student.program.programCode;

  //Set Grade
  useEffect(() => {
    if (
      student.bsitStudentRecord.length > 0 &&
      student.program.programCode === "BSIT"
    ) {
      const grade = [
        ...student.bsitStudentRecord,
        ...student.addedCourseRecord,
      ].find((record) => {
        return record.addedCourse === undefined
          ? record.bsitCurriculum?.courseCode == courseCode
          : record.addedCourse?.courseCode == courseCode;
      });
      if (grade) setGrade(grade?.grade);
      if (grade === undefined) setGrade(null);
    }

    if (
      student.bscsStudentRecord.length > 0 &&
      student.program.programCode === "BSCS"
    ) {
      const grade = [
        ...student.bscsStudentRecord,
        ...student.addedCourseRecord,
      ].find((record) => {
        return record.addedCourse === undefined
          ? record.bscsCurriculum?.courseCode == courseCode
          : record.addedCourse?.courseCode == courseCode;
      });
      if (grade) setGrade(grade?.grade);
      if (grade === undefined) setGrade(null);
    }

    if (
      student.bsisStudentRecord.length > 0 &&
      student.program.programCode === "BSIS"
    ) {
      const grade = [
        ...student.bsisStudentRecord,
        ...student.addedCourseRecord,
      ].find((record) => {
        return record.addedCourse === undefined
          ? record.bsisCurriculum?.courseCode == courseCode
          : record.addedCourse?.courseCode == courseCode;
      });
      if (grade) setGrade(grade?.grade);
      if (grade === undefined) setGrade(null);
    }

    if (
      student.blisStudentRecord.length > 0 &&
      student.program.programCode === "BLIS"
    ) {
      const grade = [
        ...student.blisStudentRecord,
        ...student.addedCourseRecord,
      ].find((record) => {
        return record.addedCourse === undefined
          ? record.blisCurriculum?.courseCode == courseCode
          : record.addedCourse?.courseCode == courseCode;
      });
      if (grade) setGrade(grade?.grade);
      if (grade === undefined) setGrade(null);
    }

    if (
      student.bsemcStudentRecord.length > 0 &&
      student.program.programCode === "BSEMC"
    ) {
      const grade = [
        ...student.bsemcStudentRecord,
        ...student.addedCourseRecord,
      ].find((record) => {
        return record.addedCourse === undefined
          ? record.bsemcCurriculum?.courseCode == courseCode
          : record.addedCourse?.courseCode == courseCode;
      });
      if (grade) setGrade(grade?.grade);
      if (grade === undefined) setGrade(null);
    }
  }, [courseId, courseCode]);

  //Edit grade
  const [editGrade, setEditGrade] = useState<number | string | null>(grade);

  const handleEditClick = () => {
    if (!closeEdit) setIsEdit(true);
    if (closeEdit) {
      setCloseEdit(false);
      setIsEdit(true);
    }
    setEditGrade(grade);
  };

  const handleGradeUpdate = async () => {
    setIsEdit(false);

    const save = async () => {
      try {
        const res = await fetch(`${apiUrl}/grade/update-grade`, {
          method: "PUT",
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: student.id,
            programId: student.program.id,
            courseCode: courseCode,
            grade: editGrade,
          }),
        });

        const data = await res.json();
        console.log(data);
        if (data) {
          setGrade(Number(editGrade));
        }
      } catch (err) {
        console.log("Update error");
      }
    };

    if (editGrade && Number(editGrade) <= 3 && Number(editGrade) >= 0) save();
  };

  // console.log(grade)

  //Style
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (closeEdit) setIsEdit(false);
  }, [closeEdit]);

  console.log()
  
  return (
    <tr className="bg-slate-100 hover:bg-slate-200 ">
      <td className="px-4 py-4 text-center border-2 border-slate-500">
        {`${
          student.firstName.charAt(0) === "@"
            ? student.firstName.slice(1)
            : student.firstName
        } ${student.lastName}`}
      </td>
      <td className="px-4 py-4 text-center border-2 border-slate-500">{`${student.studentId}`}</td>
      <td className="px-2 py-4 text-center border-2 border-slate-500">{`${
        programCode || ""
      } 
      ${student.yearLevel || ""}${student.block || ""}`}</td>
      <td className="px-2 py-4 text-center border-2 border-slate-500 relative">
        {!isEdit || closeEdit ? (
          `${grade == 0 ? "" : (grade && (Number.isInteger(Number(grade)) ? `${grade}.0` : grade)) || ""}`
        ) : (
          <>
            <input
              type="number"
              className="bg-transparent h-[1.4rem] w-[100%] focus:outline-none border-b-2 border-slate-500
            rounded-sm px-2 text-center"
              value={editGrade || ""}
              onChange={(e) => setEditGrade(e.target.value)}
            />
            {editGrade && (Number(editGrade) > 3 || Number(editGrade) <= 0) && (
              <p className="bg-blu-300 text-red-500 text-[.7rem] absolute left-[20%]">
                Invalid grade input
              </p>
            )}
          </>
        )}
      </td>
      <td className="px-2 py-4 text-center border-2 border-slate-500">
        <div className="flex gap-4 justify-center">
          {!isEdit || closeEdit ? (
            <FontAwesomeIcon
              className="text-blue-500 active:text-white"
              icon={faPenToSquare}
              onClick={handleEditClick}
            />
          ) : (
            <FontAwesomeIcon
              className="text-blue-500 active:text-white"
              icon={faSave}
              onClick={handleGradeUpdate}
            />
          )}
          {/* <FontAwesomeIcon className="text-red-500 active:text-white" 
              icon={faTrashCan}/> */}
        </div>
      </td>
    </tr>
  );
};

export default StudentGradeRow;
