

const getProgramId = (selected: string) => {
    let programId = 1;
      switch(selected) {
        case 'BS Information Technology':
          programId = 1;
          break;
        case 'BSIT':
          programId = 1;
          break;
        case 'BS Computer Science':
          programId = 2;
          break;
        case 'BSCS':
          programId = 2;
          break;
        case 'BS Information Systems':
          programId = 3;
          break;
        case 'BSIS':
          programId = 3;
          break;
        case 'BL Information Science':
          programId = 4;
          break;
        case 'BLIS':
          programId = 4;
          break;
        case 'BS Entertainment and Multimedia Computing':
          programId = 5;
          break;
        case 'BSEMC':
          programId = 5;
          break;
        default: programId = 1
      }
      return programId;
}

export default getProgramId;
