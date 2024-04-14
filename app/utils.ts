export const formatDate = (yearsBefore: number): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - yearsBefore;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
