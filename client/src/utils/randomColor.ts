
  const randomColor = () => {
    const colors: { [key: string]: string }  = {
        pink: 'bg-pink-200',
        green: 'bg-green-200',
        purple: 'bg-purple-200',
        cyan: 'bg-cyan-200',
        orange: 'bg-orange-200',
      };
      
      const colorKeys = Object.keys(colors);
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      const color = colors[randomKey];

      return color;
  }

  export default randomColor