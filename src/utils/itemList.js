/**
 * converts an array of words into a grammatical list of words as a string
 *  []                      => 'nobody'
 *  ['port', 'beans']        => 'pork and beans
 *  ['bob', 'susan', 'kai'] => 'bob, susan, and kai'
 * @param {string[]} items - list of items
 */
function itemList(items) {

  const len = items.length;
  switch(len) {
    case 0:
      return 'nobody';
    case 1:
      return items[0];
    case 2:
      return `${items[0]} and ${items[1]}`;
    default:
      return items.reduce((list, item, i) => 
        list += `, ${i === len - 1 ? 'and ' : ''}${item}`
      );
  }
};

module.exports = itemList;