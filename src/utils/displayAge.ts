export const displayAge = (birthdate: string) => {
  const today = new Date();
  const birthdateObj = new Date(birthdate);
  let age = today.getFullYear() - birthdateObj.getFullYear();
  const month = today.getMonth() - birthdateObj.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthdateObj.getDate())) {
    age--;
  }
  return `${age} ans`;
};
