import { ChangeEvent, KeyboardEvent, useState } from "react";


const UserManagement = () => {

    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
        setTags(prev => [...prev, inputValue.trim()]);
        setInputValue('');
      }
    }
    console.log(tags)

    return (
        <div className='bg-cya-100 h-[98%] flex flex-col flex-[80%] 
        rounded-lg px-10 py-6 shadow-pageComponentShadow'>
            <input type="text" 
              className="w-[20rem]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTag}
            />

            <div className="bg-cyan-100">
              <ul>
                {tags.map(tag => <li>{tag}</li>)}
              </ul>
            </div>
        </div>
    )
}

export default UserManagement