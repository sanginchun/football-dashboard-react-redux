export const formatTeamName = function (name) {
  const nameArr = name.split(" ");
  if (!isNaN(+nameArr[0][0])) {
    return nameArr.slice(1).join(" ");
  } else return name;
};

export const getLocalDate = function (dateStr) {
  // input: ISO
  const d = new Date(dateStr); // to local and formatted
  const year = d.getFullYear() + "";
  const month = (d.getMonth() + 1 + "").padStart(2, "0");
  const date = (d.getDate() + "").padStart(2, "0");
  const hour = (d.getHours() + "").padStart(2, "0");
  const minutes = (d.getMinutes() + "").padStart(2, "0");

  return `${year}-${month}-${date} ${hour}:${minutes}`;
};

export const getUniqueDates = function (dateArr, subType) {
  const uniqueDates = Array.from(
    new Set(dateArr.map((date) => date.slice(0, 10)))
  );
  if (subType === "result") uniqueDates.reverse();

  return uniqueDates;
};
