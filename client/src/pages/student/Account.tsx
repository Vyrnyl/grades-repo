import { useEffect, useState } from "react"
import Input from "../../components/shared/components/Input"
import HalfInput from "../../components/shared/components/HalfInput"
import SaveButton from "../../components/shared/components/SaveButton"
import SelectInput from "../../components/shared/components/SelectInput"
import PageContainer from "../../components/shared/components/PageContainer"
import InputFieldWrapper from "../../components/shared/components/InputFieldWrapper"
import useUserStore from "../../store/useUserStore"
import useFetch from "../../hooks/useFetch"

type AccountInfoType = {
  name: string | undefined,
  studentId: string,
  gender: string,
  email: string,
  phone: string,
  password: string,
  yearLevel: string
}

type UpdateDataType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}

const Account = () => {

  const [updateData, setUpdateData] = useState<UpdateDataType>(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  );

  const { data, error } = useFetch('users/update-user', 'PUT', JSON.stringify(updateData));
  
  const { userInfo } = useUserStore();
  const [accountInfo, setAccountInfo] = useState<AccountInfoType>({
    name: '',
    studentId: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
    yearLevel: ''
  });
  
  
  //Set AccountInfo
  useEffect(() => {
    if(userInfo) {
      setAccountInfo({
        name: userInfo?.firstName + ' ' + userInfo.lastName,
        studentId: userInfo?.studentId,
        gender: userInfo?.sex,
        email: userInfo?.email,
        phone: userInfo?.phoneNumber,
        password: '',
        yearLevel: String(userInfo.yearLevel)
      });
    }
  }, [userInfo]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInfo((prevState) => ({
      ...prevState, 
      [name]: value,
    }));
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccountInfo((prevState) => ({
      ...prevState, 
      [name]: value,
    }));
  }

  const saveForm = () => {

    setUpdateData(
      {
        firstName: accountInfo.name?.split(' ')[0] || '',
        lastName: accountInfo.name?.split(' ')[1] || '',
        email: 'ashleyshklj@gmail.com',
        password: 'ashle15',
        confirmPassword: 'ashle15'
      }
    );

    if(error) {
      console.log(error);
    } else console.log(data);
  }
  
  return (
    <PageContainer>
      <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-800">Account</h1>
        </div>
        <form className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[1.6rem] pb-7">
            <InputFieldWrapper label="Name">
              <Input type="text" name='name' value={accountInfo?.name} onChange={handleInputChange}/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Student ID">
              <HalfInput type="text" name='studentId' value={accountInfo?.studentId} onChange={handleInputChange}/>
            </InputFieldWrapper>
            <InputFieldWrapper label="">
              <SelectInput name='gender' value={accountInfo.gender} onChange={handleSelectChange} />
            </InputFieldWrapper>
          </div>
          <div className="bg-blu-500 flex-[.7] grid grid-cols-2 grid-flow-row items-center">
            <InputFieldWrapper label="Email address">
              <Input type="text" name='email' value={accountInfo?.email} onChange={handleInputChange}/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Phone Number">
              <Input type="text" name='phone' value={accountInfo?.phone} onChange={handleInputChange}/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Password">
              <Input type="password" name='password' value={accountInfo?.password} onChange={handleInputChange}/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Course/Block/Year">
              <Input type="number" name='yearLevel' value={accountInfo?.yearLevel} onChange={handleInputChange}/>
            </InputFieldWrapper>
          </div>
        </form>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          <SaveButton onClick={saveForm}/>
        </div>  
    </PageContainer>
  )
}

export default Account