
const isFacIDValid = (str: string) => {

    const format = /^\d{4}$/;

    return format.test(str)
}

export default isFacIDValid