import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react'

type CustomSelectProps = {
    className?: string,
    option: string[],
    setValue: (value: React.SetStateAction<string>) => void,
    selectedItem?: number,
    isSlate?: boolean,
    x?: string
}

const CustomSelect = ({ className, option, setValue, selectedItem, isSlate, x } : CustomSelectProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string>(option[selectedItem || 0]);

    const getListValue = (e: React.MouseEvent<HTMLLIElement>) => {
        setSelected(e.currentTarget.textContent || '');
        setValue(e.currentTarget.textContent || '');
    }
    
    
    //Style
    const selectRef = useRef<HTMLDivElement>(null);
    const handleOutsideClick = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div onClick={() => setIsOpen(!isOpen)} ref={selectRef} className={`${className} bg-re-200
        flex items-center justify-between relative px-4`}>
            <p className='text-[.95rem] font-semibold text-slate-700 text-ellipsis overflow-hidden whitespace-nowrap'>{selected}</p>
            <FontAwesomeIcon className="active:text-white scale-y-[70%]" icon={faChevronDown}/>
            {isOpen && 
                <div className='bg-blu-300 absolute top-[1.5rem] right-0 z-50'>
                    <ul className={`selected bg-white max-h-[10rem] overflow-y-auto flex flex-col ${x}`}>
                        {option.map((item, i) => <li key={i} onClick={getListValue} value={item}
                        className={`bg-gree-200 px-4 hover:bg-slate-200 ${(i === 0 && isSlate) && 'bg-slate-200'}
                        `}>{item}</li>)}
                    </ul>
                </div>
            }
        </div>
    )
}

export default CustomSelect