import PageContainer from "../../components/shared/components/PageContainer"
import InputFieldWrapper from "../../components/shared/components/InputFieldWrapper"
import Input from "../../components/shared/components/Input"
import HalfInput from "../../components/shared/components/HalfInput"
import SelectInput from "../../components/shared/components/SelectInput"
import SaveButton from "../../components/shared/components/SaveButton"
import { useEffect, useState } from "react"
import useUserStore from "../../store/useUserStore"
import handleInputChange from "../../utils/handleInputChange"
import handleSelectChange from "../../utils/handleSelectChange"

type AccountInfoType = {
  fullName: string,
  studentId: string,
  gender: string,
  email: string,
  phoneNumber: string,
  password: string
}


const Account = () => {


  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');

  const { userInfo } = useUserStore();

  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    fullName: '',
    studentId: '',
    gender: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  
  //SetAccInfo
  useEffect(() => {

    setAccountInfo({
      fullName: `${userInfo?.firstName} ${userInfo?.lastName || ""}`,
      studentId: userInfo?.studentId || "",
      gender: userInfo?.sex || "",
      email: userInfo?.email || "",
      phoneNumber: userInfo?.phoneNumber || "",
      password: ''
    });
  }, [userInfo]);
  
  
  //SaveData
  const [isSave, setIsSave] = useState(false);
  const [save, setSave] = useState('Saving');
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSave(true);

    let fullName = accountInfo.fullName.split(' ');
    const updateUser = async () => {

      const updatedData = {
        studentId: accountInfo.studentId,
        firstName: fullName[0],
        lastName: fullName[fullName.length - 1],
        email: accountInfo.email,
        phoneNumber: accountInfo.phoneNumber,
        password: accountInfo.password,
        sex: accountInfo.gender
      }
      
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
          setSave('Saved!');
          setTimeout(() => {
            setIsSave(false);
          }, 700);
        }

      } catch(error) {
        console.log("Fetch error" + error);
      }
    }

    updateUser();
}


  return (
    <PageContainer className="relative">
      <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-800">Account</h1>
        </div>
        <form className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[1.6rem] pb-7">
            <InputFieldWrapper label="Name">
              <Input type="text" name='fullName' value={accountInfo.fullName} 
              onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem]"/>
            </InputFieldWrapper>

            <InputFieldWrapper label="Student ID">
              <HalfInput type="text" name='studentId' value={accountInfo.studentId} 
              onChange={(e) => handleInputChange(e, setAccountInfo)}/>
            </InputFieldWrapper>

            <InputFieldWrapper label="">
              <SelectInput name='gender' value={accountInfo.gender} 
              onChange={(e) => handleSelectChange(e, setAccountInfo)}/>
            </InputFieldWrapper>
          </div>

          <div className="bg-blu-500 flex-[.7] grid grid-cols-2 grid-flow-row items-center">
            <InputFieldWrapper label="Email address">
              <Input type="text" name='email' value={accountInfo.email} 
              onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem]"/>
            </InputFieldWrapper>

            <InputFieldWrapper label="Phone Number">
              <Input type="text" name='phoneNumber' value={accountInfo.phoneNumber} 
              onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem]"/>
            </InputFieldWrapper>

            <InputFieldWrapper label="Password">
              <Input type="password" name='password' value={accountInfo.password} 
              onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem]"/>
            </InputFieldWrapper>
          </div>
        </form>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          <SaveButton className="bg-slate-500" onClick={handleUpdate}/>

          {isSave && 
            <div className="bg-white h-[4rem] px-4 flex items-center absolute left-[50%] top-[50%] 
            translate-y-[-50%] translate-x-[-50%] card-shadow rounded-lg z-10">
              <h1 className="text-[1.2rem] font-semibold text-slate-700 ">{save}</h1>
            </div>
          }
        </div>
        
    </PageContainer>
  )
}

export default Account