
const getProgram = (programId: number) => {
    let program = '';
    switch(programId) {
    case 1:
        program = 'BSIT';
        break;
    case 2:
        program = 'BSCS';
        break;
    case 3:
        program = 'BSIS';
        break;
    case 4:
        program = 'BLIS';
        break;
    case 5:
        program = 'BSEMC';
        break;
    default: program = 'BSIT'
    }

    return program;
}

export default getProgram;