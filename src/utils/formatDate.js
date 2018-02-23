module.exports = function formatDate(dateObj) {
  // pull out relevant info
  const dateStr = JSON.stringify(dateObj);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [ date, time ] = dateStr
    .replace(/("|:\d{2}\.\d{3}Z)/g, '') // trim unecessary info
    .split('T');

  let [ year, month, day ] = date.split('-'),
      [ hour, min ] = time.split(':');
  
  // reformat pieces
  month = months[parseInt(month)];

  const numHour = parseInt(hour);
  let meridiem = 'am';
  if(numHour > 12) {
    hour = hour - 12;
    meridiem = 'pm';
  }
  else if(numHour < 10) {
    hour = numHour ? numHour % 10 : '12';
  }

  return `${month} ${day}, ${year} — ${hour}:${min}${meridiem}`;
}