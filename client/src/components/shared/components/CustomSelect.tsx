import React, { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
    options: string[];
    onChange: (selectedOption: string) => void;
    className?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, className }) => {
    const [selected, setSelected] = useState<string>(options[0]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelected(option);
        onChange(option);
        setIsOpen(false);
    };

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
        <div className={`${className} custom-select`} ref={selectRef}>
            <div className="select-selected" onClick={handleSelectClick}>
                {selected}
            </div>
            {isOpen && (
                <div className="select-items">
                    {options.map((option, index) => (
                        <div key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    );
};

export default CustomSelect;
