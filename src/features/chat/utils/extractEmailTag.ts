export const extractEmailTag = (email: string) => {
  const firstLetter = email.charAt(0).toUpperCase();
  const secondLetter = email.charAt(email.indexOf('@') - 1).toUpperCase();
  return `${firstLetter}${secondLetter}`;
};
