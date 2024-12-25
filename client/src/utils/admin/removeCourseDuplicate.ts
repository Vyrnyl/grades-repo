
const removeCoursetDuplicate = (array: { courseCode: string, userId?: number }[]) => {

    const filteredArray: { courseCode: string, userId?: number }[] = [];

    for(const item of array) {
        if(!filteredArray.some(existingItem => existingItem.courseCode === item.courseCode)) {
            filteredArray.push(item);
        }
    }
    
    return filteredArray;
}

export default removeCoursetDuplicate