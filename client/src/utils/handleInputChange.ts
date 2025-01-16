

const handleInputChange = <T extends Record<string, any>>(
    e: React.ChangeEvent<HTMLInputElement>, 
    setInfo: React.Dispatch<React.SetStateAction<T>>
) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
        ...prevState, 
        [name]: value,
    }));
}

export default handleInputChange;