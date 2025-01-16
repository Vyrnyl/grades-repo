
const removeObjectDuplicate = (array: { programCode: string, userId?: number }[]) => {

    const filteredArray: { programCode: string, userId?: number }[] = [];

    for(const item of array) {
        if(!filteredArray.some(existingItem => existingItem.programCode === item.programCode)) {
            filteredArray.push(item);
        }
    }
    
    return filteredArray;
}

export default removeObjectDuplicate