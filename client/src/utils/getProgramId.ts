

const getProgramId = (selected: string) => {
    let programId = 1;
      switch(selected) {
        case 'BS Accountancy':
          programId = 1;
          break;
        case 'BS Business Administration':
          programId = 2;
          break;
        case 'BS Management Accounting':
          programId = 3;
          break;
        default: programId = 1
      }
      return programId;
}

export default getProgramId;;
