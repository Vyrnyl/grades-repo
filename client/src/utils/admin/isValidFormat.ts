

const isValidFormat = (str: string) => {

    const format = /^\d{4}-\d{5}$/;

    return format.test(str)
}

export default isValidFormat