import Input from "../shared/components/Input"
import HalfInput from "../shared/components/HalfInput"
import SaveButton from "../shared/components/SaveButton"
import SelectInput from "../shared/components/SelectInput"
import PageContainer from "../shared/components/PageContainer"

const Account = () => {
  return (
    <PageContainer>
      <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-800">Account</h1>
        </div>
        <form className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[1.6rem] pb-7">
            <div className="flex flex-col">
              <label>Name</label>
              <Input type="text"/>
            </div>
            <div className="flex flex-col bg-gree-500 ">
              <label>StudentID</label>
              <HalfInput type="text"/>
            </div>
            <div className="flex flex-col">
              <SelectInput/>
            </div>
          </div>
          <div className="bg-blu-500 flex-[.7] grid grid-cols-2 grid-flow-row items-center">
            <div className="flex flex-col">
              <label>Email address</label>
              <Input type="email"/>
            </div>
            <div className="flex flex-col">
              <label>Phone number</label>
              <Input type="text"/>
            </div>
            <div className="flex flex-col bg-gree-500 ">
              <label>Password</label>
              <Input type="text"/>
            </div>
            <div className="bg-gree-500 flex flex-col">
              <label>Course/Block/Year</label>
              <Input type="text"/>
            </div>
          </div>
        </form>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          <SaveButton/>
        </div>
    </PageContainer>
  )
}

export default Account