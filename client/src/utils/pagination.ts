import { useState } from "react";

const pagination = (courses: any[]) => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(7);
    
    let x = courses.reverse();
    let entries = x.slice(start, end);
    
    const handleNext = () => {
        if(entries.length % 7 === 0) {
        setStart(prev => prev + 7);
        setEnd(prev => prev + 7);
        }
    }
    const handlePrev = () => {
        if(start >= 6){
        setStart(prev => prev - 7);
        setEnd(prev => prev - 7);
        }
    }

    return { handleNext, handlePrev, entries }
}

export default pagination;