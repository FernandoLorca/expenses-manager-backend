const emailFormatValidation = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
};

const passwordFormatValidation = (password: string): boolean =>
  password.length < 6 || password.length > 24 ? false : true;

export const inputsFormatValidation = {
  emailFormatValidation,
  passwordFormatValidation,
};
