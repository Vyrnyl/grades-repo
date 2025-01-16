
const getProgramName = (programId: number) => {
    let programName = '';
      switch(programId) {
        case 1:
          programName = 'BS Information Technology';
          break;
        case 2:
          programName = 'BS Computer Science';
          break;
        case 3:
          programName = 'BS Information Systems';
          break;
        case 4:
          programName = 'BL Information Science';
          break;
        case 5:
          programName = 'BS Entertainment and Multimedia Computing';
          break;
        default: programName = 'BS Information Technology'
      }
      return programName;
}

export default getProgramName;