export const genUsername = (name) => {
  let randomChar = Math.random().toString(36).substring(2, 5);
  return name + "_" + randomChar;
};
