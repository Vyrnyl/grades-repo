import NotifContent from "../../components/shared/components/NotifContent";
import PageContainer from "../../components/shared/components/PageContainer"
import CustomSelect from "../../components/shared/components/CustomSelect"
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

type Notification = {
    id: number,
    userId: number,
    content: String
}

const Notification = () => {

    const { data } = useFetch('notification/get-notifications', 'GET');

   const [notifications, setNotifications] = useState<Notification[]>([]);
   
    //Set Notif
    useEffect(() => {
        if(data) setNotifications(data as Notification[]);
    }, [data]);
    
    //Style
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
                {notifications.map((notif, i) => <NotifContent key={i}>{notif.content}</NotifContent>)}
            </ul>
        </div>
    </PageContainer>
  )
}

export default Notification

