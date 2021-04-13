export const formatTeamName = function (name) {
  const nameArr = name.split(" ");
  if (!isNaN(+nameArr[0][0])) {
    return nameArr.slice(1).join(" ");
  } else return name;
};
