
const yearSuffix = (yearLevel: number | undefined) => {
    let suffix: string = '';
    switch(yearLevel) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      case 4:
        suffix = 'th';
        break;
      default: suffix = '';
        break;
    };
    return suffix;
}

export default yearSuffix;