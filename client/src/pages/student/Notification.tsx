import NotifContent from "../../components/shared/components/NotifContent";
import PageContainer from "../../components/shared/components/PageContainer"
import CustomSelect from "../../components/shared/components/CustomSelect"

const Notification = () => {

    const handleSelectionChange = (selectedOption: string) => {
        console.log(selectedOption);
    };

  return (
    <PageContainer>
        <div className="bg-gree-200 flex justify-between p-10">
            <h1 className='bg-re-200 text-[1.2rem] font-medium'>Notifications</h1>
            <div className="flex bg-re-200 items-center">
                <CustomSelect options={['All', 'Unread', 'Read']}
                    onChange={handleSelectionChange}/>
                <span className="transform scale-100">▼</span>

            </div>
        </div>
        <div className="bg-cya-200 h-[100%] px-[4rem] pb-[4rem] overflow-auto scrollbar-hide">
            <ul className="">
                <NotifContent>New grade from JUAN DELA CRUZ</NotifContent>
            </ul>
        </div>
    </PageContainer>
  )
}

export default Notification

