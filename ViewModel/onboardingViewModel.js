import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from "react";
import { guardarUsuario, loginUsuario } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';

export const useOnboardingViewModel = (onFinish) => {
  const { login: authLogin } = useContext(AuthContext);

  const validateEmail = (email) => {
   const regex = /\S+@\S+\.\S+/;
   return regex.test(email);
   };

  const validatePassword = (password) => {
  // ejemplo: mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   return regex.test(password);
   };

 
  const [firstname, setfirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const navigation = useNavigation();

  const registrar = async () => {
   if (!firstname || !email || !password) {
    setMensaje("Please complete all fields ❌");
    return;
   }

   if (!isEmailValid) {
    setMensaje("Invalid email format ❌");
    return;
   }

   if (!isPasswordValid) {
    setMensaje("Password does not meet requirements ❌");
    return;
   }
   try{
    const success = await guardarUsuario({ firstname, email, password });
    setMensaje(success ? "Registered user ✅" : "Error registering ❌");
    if (success) {
      await authLogin({ firstname, email });
      await onFinish();
      navigation.navigate("MainTabs", { screen: "Profile" });
    }
    } catch (error) {
    console.error("Error registering user:", error);
    setMensaje("Unexpected error ❌");
  }
  };

  const login = async () => {
    try{
      const result = await loginUsuario(email, password);
      if (result.success) {
        setMensaje(`Bienvenido ${result.user.firstname} ✅`);
        await authLogin({ firstname: result.user.firstname, email: result.user.email });
        await onFinish();
        setTimeout(() => {
          navigation.replace('Home');
        }, 1000);
      } else {
        setMensaje(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMensaje("An unexpected error occurred ❌");
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