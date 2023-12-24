export const dateConvertor = (newDate) => {
  const convertedDate =
    newDate.getFullYear() + "-" + newDate.getMonth() + "-" + newDate.getDate();
  return convertedDate;
};
