

const getLatinHonor = (gwa: number) => {

    let status = '';

    if(gwa <= 1.6) status = 'CUM LAUDE'
    if(gwa <= 1.4) status = 'MAGNA CUM LAUDE'
    if(gwa <= 1.2) status = 'SUMMA CUM LAUDE'
    
    return status;
}

export default getLatinHonor;