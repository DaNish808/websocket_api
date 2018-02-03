module.exports = function nameList(names) {

  const len = names.length;
  switch(len) {
    case 0:
      return 'nobody';
    case 1:
      return names[0];
    case 2:
      return `${names[0]} and ${names[1]}`;
    default:
      return names.reduce((list, name, i) => 
        list += `, ${i === len - 1 ? 'and ' : ''}${name}`
      );
  }
};