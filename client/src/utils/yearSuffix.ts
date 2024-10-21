
const yearSuffix = (yearLevel: number | undefined) => {
    let suffex: string = '';
    switch(yearLevel) {
      case 1:
        suffex = 'st';
        break;
      case 2:
        suffex = 'nd';
        break;
      case 3:
        suffex = 'rd';
        break;
      case 4:
        suffex = 'th';
        break;
      default: suffex = '';
        break;
    };
    return suffex;
}

export default yearSuffix;