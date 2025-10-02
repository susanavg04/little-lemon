import { useState } from "react";
import { guardarUsuario, loginUsuario } from "../Model/DataBase_AsyncStorage";

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

 
  const [firstname, setfirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const registrar = async () => {
    const success = await guardarUsuario({ firstname, email, password });
    setMensaje(success ? "Registered user ✅" : "Error registering ❌");
  };

  const login = async () => {
    const result = await loginUsuario(email, password);
    if (result.success) {
      setMensaje(`Bienvenido ${result.user.firstname} ✅`);
    } else {
      setMensaje(result.message);
    }
  };
  
  


  return {
    firstname,
    email,
    password,
    mensaje,
    setfirstname,
    setEmail,
    setPassword,
    registrar,
    login,
    isEmailValid,
    isPasswordValid,

  };
  
}