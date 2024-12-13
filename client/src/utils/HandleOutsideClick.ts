import { useEffect } from "react";


const HandleOutsideClick = (ref: React.RefObject<HTMLDivElement>, setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>) => {
    const handleOutsideClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            const target = event.target as HTMLElement;
            if(target.tagName == "path" || target.tagName == "svg") setIsOpen(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
}

export default HandleOutsideClick;