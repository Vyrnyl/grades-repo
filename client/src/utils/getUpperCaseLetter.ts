

const getUppercaseLetters = (sentence: string) => {
    const uppercaseLetters = sentence.match(/[A-Z]/g);
    return uppercaseLetters ? uppercaseLetters.join('') : '';
}

export default getUppercaseLetters