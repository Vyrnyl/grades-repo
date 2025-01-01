import { useEffect, useState } from 'react';
const UserManagement = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('atoken');
  

  //GET IMAGE
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    try {
      const getProfilePic = async () => {
        const res = await fetch(`${apiUrl}/image/get-image`, {
          method: 'POST',
          headers: {
            'Authorization': token ? token : '',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: 10 })
        });
        const data = await res.json();
  
        if(res.ok && data) {
          const src = `data:${data.mimeType};base64,${data.image}`;
          setImgSrc(src);
          
        }
      }
      getProfilePic();
    } catch(e) {
      console.log(`Error`)
    }
    
  }, []);






  //POST
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

 useEffect(() => {
  
  const formData = new FormData();
  
  if(image) {
    formData.append('image', image);
    formData.append('id', '2');
  }
  
  const addImage = async () => {
    try {
      const res = await fetch(`${apiUrl}/image/add-image`, {
        method: 'POST',
        headers: {
          'Authorization': token ? token : ''
        },
        body: formData
      });
      const data = await res.json();
      console.log(data)
    } catch(e) {
      console.log(`Error`)
    }
  }
  // addImage();

}, [image]);


  return (
      <div className='bg-cya-100 h-[98%] flex flex-col flex-[80%] 
      rounded-lg px-10 py-6 shadow-pageComponentShadow'>
        <img src={imgSrc} alt="" className='h-[10rem] w-[10rem] rounded-full object-cover' />

        <input type="file" onChange={handleImageChange}/>
      </div>
  )
}

export default UserManagement