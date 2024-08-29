import { loginErrors, loginUser } from "../userInterfaces";

export const validationLogin = (input: loginUser): loginErrors => {
  const regexEmail = /\S+@\S+.\S+/;
  const regexPasswordNumber = /[0-9]/;
  const regexPasswordWord = /[a-zA-Z]/;
  const regexPasswordSpecial = /[!@#$%&*()<>|]/;

  const error: loginErrors = {
    email: "",
    password: "",
  };

  if (!regexEmail.test(input.email)) {
    error.email = "Correo invalido";
  }
  if (
    !regexPasswordNumber.test(input.password) ||
    !regexPasswordSpecial.test(input.password) ||
    !regexPasswordWord.test(input.password)
  ) {
    error.password = "Contraseña invalida";
  }

  return error;
};
