import { useState } from "react";
import { guardarDatos } from "../Model/DataBase_AsyncStorage";

export const useOnboardingViewModel = () => {
 
  const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

 const validatePassword = (password) => {
  // ejemplo: mínimo 8 a 10 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  return regex.test(password);
};
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const saveUser = async () => {
    const user = { firstname, email, password };
    await guardarDatos (user);
  };

  return {
    email,
    firstname,
    password,
    setEmail,
    setFirstName,
    setPassword,
    isEmailValid,
    isPasswordValid,
    guardarDatos,
  };
};