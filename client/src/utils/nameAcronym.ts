
const nameAcronym = (fullName: string) => {
    let name = fullName.split(' ');
    let acronym = "";

    for(let i = 0; i < name.length; i++) {
        acronym += name[i][0];
    }
    
    return acronym;
}

export default nameAcronym;