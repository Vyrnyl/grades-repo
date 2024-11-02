import PageContainer from "../../components/shared/components/PageContainer"
import InputFieldWrapper from "../../components/shared/components/InputFieldWrapper"
import Input from "../../components/shared/components/Input"
import HalfInput from "../../components/shared/components/HalfInput"
import SelectInput from "../../components/shared/components/SelectInput"
import SaveButton from "../../components/shared/components/SaveButton"

const Account = () => {
  return (
    <PageContainer>
      <div className="bg-re-200 flex-[.2] ml-[5rem] w-[65%] flex items-end">
          <h1 className="text-[2rem] font-bold text-slate-800">Account</h1>
        </div>
        <form className="bg-cya-200 w-[65%] flex-[.6] ml-[5rem] flex flex-col">
          <div className="bg-gree-300 flex-[.3] flex flex-wrap items-end gap-[1.6rem] pb-7">
            <InputFieldWrapper label="Name">
              <Input type="text" className="w-[20rem]"/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Falculty ID">
              <HalfInput type="text"/>
            </InputFieldWrapper>
            <InputFieldWrapper label="">
              <SelectInput/>
            </InputFieldWrapper>
          </div>
          <div className="bg-blu-500 flex-[.7] grid grid-cols-2 grid-flow-row items-center">
            <InputFieldWrapper label="Email address">
              <Input type="text" className="w-[20rem]"/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Phone Number">
              <Input type="text" className="w-[20rem]"/>
            </InputFieldWrapper>
            <InputFieldWrapper label="Password">
              <Input type="text" className="w-[20rem]"/>
            </InputFieldWrapper>
          </div>
        </form>
        <div className="bg-gree-200 flex-[.2] ml-[5rem] w-[65%] flex justify-center">
          <SaveButton className="bg-slate-500"/>
        </div>
    </PageContainer>
  )
}

export default Account