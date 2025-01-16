
const optionArray = (array: string[], selected: string) => {

    const filteredArray = selected === '' || selected == null ? array : 
    (array.splice(array.indexOf(selected), 1), 
    array.unshift(selected), array);
    
    return filteredArray
}

export default optionArray