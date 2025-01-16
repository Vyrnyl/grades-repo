import { faCheck, faClose, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import useUserStore from "../../../store/useUserStore";

type ProfilePic = {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  hasPic?: boolean
};

const ProfilePic = ({ className, onClick, setIsOpen, hasPic }: ProfilePic) => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('atoken');

    const { userInfo } = useUserStore();
    
    const [isDone, setIsDone] = useState(false);
    const [image, setImage] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        if(inputRef.current) inputRef.current.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setImage(imageUrl);
          setImageData(file);
        }
    };
    
    const [imageData, setImageData] = useState<File | null>(null);
    const handleUploadImage = async () => {

        setIsDone(true);

        const formData = new FormData();
        
        if(imageData) {
            formData.append('image', imageData);
            formData.append('id', String(userInfo?.id || ''));
        }

        const res = await fetch(`${apiUrl}/image/${hasPic ? 'update-image' : 'add-image'}`, {
            method: `${hasPic ? 'PUT' : 'POST'}`,
            headers: {
              'Authorization': token ? token : ''
            },
            body: formData
        });
        const data = await res.json();
        console.log(data)
        if(res.ok && !data.error) {
            setIsOpen(false);
            setIsDone(false);
        } else setIsDone(false);
    }

    return (
        <div
        onClick={onClick}
        className={`bg-slate-400 ${className} w-[15rem] h-[17rem] flex flex-col justify-around items-center rounded-md`}
        >
        <div className="bg-re-200 p-2 border-b-2 border-slate-500">
            <p className="font-semibold text-slate-700">Profile Settings</p>
            <h1 className="text-[1.1rem] font-semibold">Change Profile Picture</h1>
            <FontAwesomeIcon
            className="absolute cursor-pointer text-[1.4rem] text-slate-700 top-2 right-2 
                active:scale-[110%] active:text-white"
            icon={faClose}
            onClick={() => setIsOpen(false)}
            />
        </div>

        <div onClick={handleUpload} className={`bg-slate-300 cursor-pointer rounded-full w-[8rem] h-[8rem] 
        grid place-content-center border-slate-500 border-dashed ${image ? '' : 'border-2'}`}>
            {image ? <img src={image} alt="" className="object-cover rounded-full h-[8rem] w-[8rem]" /> : 
            <FontAwesomeIcon
            className=" text-[4rem] text-slate-600"
            icon={faUser}/> }
            
            <input type="file" ref={inputRef} className='hidden' onChange={handleImageChange} />
        </div>
        <button onClick={handleUploadImage} 
        className={`${!isDone ? 'bg-blue-500' : 'bg-white'} text-white text-[1.1rem] 
        font-semibold px-4 py-1 rounded-md active:scale-105 w-[6rem] h-[2rem] grid place-content-center`}>
           {!isDone ? 'Upload' : 
             <FontAwesomeIcon
             className=" text-[2rem] text-green-500"
             icon={faCheck}/>
           }
        </button>
        </div>
    );
};

export default ProfilePic;
