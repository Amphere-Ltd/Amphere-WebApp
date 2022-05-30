const REGEX_FOR_EMAIL =
  /([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/;
const REGEX_FOR_PHONE =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const isValidEmail = (s) => {
  return REGEX_FOR_EMAIL.test(s);
};

const isValidPhone = (s) => {
  return REGEX_FOR_PHONE.test(s);
};

const regexValidator = {
  isValidEmail: isValidEmail,
  isValidPhone: isValidPhone,
};

export default regexValidator;
