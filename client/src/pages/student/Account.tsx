import { useEffect, useState } from "react"
import Input from "../../components/shared/components/Input"
import HalfInput from "../../components/shared/components/HalfInput"
import SaveButton from "../../components/shared/components/SaveButton"
import SelectInput from "../../components/shared/components/SelectInput"
import PageContainer from "../../components/shared/components/PageContainer"
import InputFieldWrapper from "../../components/shared/components/InputFieldWrapper"
import useUserStore from "../../store/useUserStore"
import handleInputChange from "../../utils/handleInputChange"
import handleSelectChange from "../../utils/handleSelectChange"
import useFetch from "../../hooks/useFetch"
import { User } from "../../types/studentTypes"
import isValidFormat from "../../utils/admin/isValidFormat"

type AccountInfoType = {
  firstName: string,
  middleName?: string,
  lastName: string,
  studentId: string,
  sex: string,
  email: string,
  phoneNumber: string,
  password: string,
  yearLevel: string,
  block: string
}

const Account = () => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');
  
  const { userInfo, setUserInfo } = useUserStore();
  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    sex: '',
    email: '',
    phoneNumber: '',
    password: '',
    yearLevel: '',
    block: ''
  });
  
  //SetAccInfo
  useEffect(() => {

    if(userInfo) {
      setAccountInfo({
        firstName: userInfo.firstName || "",
        middleName: userInfo.middleName || "",
        lastName: userInfo.lastName || "",
        studentId: userInfo?.studentId || "",
        sex: userInfo?.sex || "",
        email: userInfo?.email || "",
        phoneNumber: userInfo?.phoneNumber || "",
        password: '',
        yearLevel: String(userInfo?.yearLevel || ''),
        block: userInfo?.block || ''
      });
    }
  }, [userInfo]);
  

  //SaveData
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [isUserIdExist, setIsUserIdExist] = useState(false);
  const [isValidIDFormat, setIsValidIDFormat] = useState(false);

  const [isSave, setIsSave] = useState(false);
  const [save, setSave] = useState('Saving');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSave(true);
    setIsEmailExist(false);
    setIsUserIdExist(false);
    setIsValidIDFormat(false);

    const updatedData = {
      id: userInfo?.id,
      studentId: accountInfo.studentId,
      firstName: accountInfo?.firstName,
      middleName: accountInfo?.middleName,
      lastName: accountInfo?.lastName,
      email: accountInfo.email,
      phoneNumber: accountInfo.phoneNumber,
      yearLevel: Number(accountInfo.yearLevel),
      block: accountInfo.block,
      password: accountInfo.password,
      sex: accountInfo.sex
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

        const data = await res.json();
        
        if(res.ok && data) {

          const { id, ...data } = updatedData;

          const modifiedData = {
            ...data,
            yearLevel: String(data.yearLevel),
          };

          setAccountInfo(modifiedData);
          setSave('Saved!');
          setTimeout(() => {
            setIsSave(false);
          }, 700);
        }

        if(res.status === 409) {
          setIsUserIdExist(true);
          setIsSave(false);
        }

        if(data.error && res.status !== 409) {
          setIsEmailExist(true);
          setIsSave(false);
        }

      } catch(error) {
        console.log("Fetch error" + error);
      }
    }
    
    if(isValidFormat(updatedData.studentId)) 
      updateUser();
    else setTimeout(() => {
        setIsValidIDFormat(true);
        setIsUserIdExist(false);
        setIsSave(false);
    }, 100);
  }

  const { error, data } = useFetch("user/get-user", "GET");

  useEffect(() => {
    if (!error && data) {
      setUserInfo(data as User);
    }
  }, [data]);

  return (
    <PageContainer className="relative">
      <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-700">Account</h1>
        </div>
        <form onSubmit={handleUpdate} className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col relative">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[2rem] pb-7">
            <div className="flex gap-2">
              <InputFieldWrapper label="First Name">
                <Input type="text" name='firstName' value={accountInfo.firstName} 
                onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[15rem] border-[.1rem]"/>
              </InputFieldWrapper>

              <InputFieldWrapper label="Middle Name">
                <Input type="text" name='middleName' value={accountInfo.middleName} 
                onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[15rem] border-[.1rem]"/>
              </InputFieldWrapper>

              <InputFieldWrapper label="Last Name">
                <Input type="text" name='lastName' value={accountInfo.lastName} 
                onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[15rem] border-[.1rem]"/>
              </InputFieldWrapper>
            </div>

            <div className="bg-re-200 flex gap-[.7rem] relative">
              <InputFieldWrapper label="Student ID">
                <HalfInput type="text" name='studentId' value={accountInfo.studentId} 
                onChange={(e) => handleInputChange(e, setAccountInfo)}/>
              </InputFieldWrapper>
              {isUserIdExist && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
              ml-2 text-start mt-[-1rem] absolute bottom-[-1.1rem]">UserID already exist!</p>}
              {isValidIDFormat && <p className="bg-cya-200 text-[.8rem] font-semibold text-red-500 
              ml-2 text-start mt-[-1rem] absolute bottom-[-1.1rem]">
                  Invalid format! (eg. 1234-12345)
              </p>}
              <InputFieldWrapper label="Gender">
                <SelectInput name='sex' value={accountInfo.sex} 
                onChange={(e) => handleSelectChange(e, setAccountInfo)}/>
              </InputFieldWrapper>
                
              <InputFieldWrapper label="Year Level">
                <select name="yearLevel" className='bg-re-300 h-[2.5rem] w-[10rem] focus:outline-slate-500
                border-[.1rem] border-slate-300 rounded-lg px-2' value={accountInfo.yearLevel}
                onChange={(e) => handleSelectChange(e, setAccountInfo)}>
                  <option value="" disabled>None</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                </select>
              </InputFieldWrapper>

              <InputFieldWrapper label="Block">
                <select name="block" className='bg-re-300 h-[2.5rem] w-[10rem] focus:outline-slate-500
                border-[.1rem] border-slate-300 rounded-lg px-2' value={accountInfo.block}
                onChange={(e) => handleSelectChange(e, setAccountInfo)}>
                  <option value="" disabled>None</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </InputFieldWrapper>
            </div>
          </div>
          
          <div className="bg-blu-500 flex-[.7] flex flex-wrap gap-x-[2rem]">
            <div className="bg-cya-200 flex flex-col gap-[2rem]">
              <InputFieldWrapper label="Email address" className="bg-cya-200 relative">
                <Input type="text" name='email' value={accountInfo.email} 
                onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem] border-[.1rem]"/>
                {isEmailExist && <p className="text-[.8rem] font-semibold text-red-500 ml-2 absolute bottom-[-1.1rem]">
                  Email already registered!</p>}
              </InputFieldWrapper>

              <InputFieldWrapper label="Phone Number">
                <Input type="text" name='phoneNumber' value={accountInfo.phoneNumber} 
                onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem] border-[.1rem]"/>
              </InputFieldWrapper>
            </div>

            <InputFieldWrapper className="" label="Password">
              <Input type="password" name='password' value={accountInfo.password} 
              onChange={(e) => handleInputChange(e, setAccountInfo)} className="w-[20rem] border-[.1rem]"/>
            </InputFieldWrapper>
            
            <SaveButton type="submit" className="bg-slate-400 absolute bottom-[-2rem] left-[50%] translate-x-[-50%]"/>
          </div>
        </form>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          {/* <SaveButton type="submit" className="bg-slate-400" onClick={handleUpdate}/> */}

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