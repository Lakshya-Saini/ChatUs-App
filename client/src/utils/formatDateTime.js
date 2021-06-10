const formatDateTime = (dateTime) => {
  const fullDate = dateTime.substring(0, 10);
  const time = dateTime.substring(11, 16);

  let monthArray = {
    "00": undefined,
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const month = monthArray[fullDate.substring(5, 7)];
  const date = fullDate.substring(8, 10);
  const meridian = time.substring(0, 2) < 12 ? "am" : "pm";

  return `${month}, ${date} at ${time} ${meridian}`;
};

export default formatDateTime;
