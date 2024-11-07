import { User } from "../../types/studentTypes";

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('atoken');

type DeleteProps = {
    setIsDelete: (isDelete: boolean) => void,
    setStudents: React.Dispatch<React.SetStateAction<[] | User[]>>,
    student: User
}

const deleteUser = async ({ setIsDelete, setStudents, student } : DeleteProps) => {
    setIsDelete(false);
    try {
      const res = await fetch(`${apiUrl}/user/delete-user`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? token : '',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({ userId: student.id })
      });

      const data = await res.json();

      if(res.ok && data) {
        setStudents((prev) => {
          return prev.filter((stud) => stud.id != student.id);
        });
      }
      console.log(data)

    } catch(error) {
      console.log('Request Error');
    }
}

export { deleteUser };