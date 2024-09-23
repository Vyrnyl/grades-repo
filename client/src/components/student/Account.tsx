import Input from "../shared/components/Input"
import HalfInput from "../shared/components/HalfInput"
import SaveButton from "../shared/components/SaveButton"
import SelectInput from "../shared/components/SelectInput"

const Account = () => {
  return (
    <>
      <div className='bg-slate-100 h-[96%] flex flex-col flex-[.8] shadow-pageComponentShadow 
      rounded-lg'>
        <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-800">Account</h1>
        </div>
        <div className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[1.6rem]">
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
              <label>FirstName</label>
              <Input type="text"/>
            </div>
            <div className="flex flex-col">
              <label>FirstName</label>
              <Input type="text"/>
            </div>
            <div className="flex flex-col bg-gree-500 ">
              <label>FirstName</label>
              <Input type="text"/>
            </div>
            <div className="bg-gree-500 flex flex-col">
              <label>FirstName</label>
              <Input type="text"/>
            </div>
          </div>
        </div>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          <SaveButton/>
        </div>
      </div>
    </>
  )
}

export default Account