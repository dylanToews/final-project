export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];


function fixNumber(value) {
  value = value.map(hour => {
    if (hour < 10) {
      hour = "0" + hour;
    }
    return hour;
  })
  return value;
};

export const minutesNumber = fixNumber(Array.from(Array(60).keys()));
export const hourNumber = fixNumber(Array.from(Array(13).keys()));

