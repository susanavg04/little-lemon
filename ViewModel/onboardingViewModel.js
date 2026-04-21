import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from "react";
import { loginUsuario } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';


export const useOnboardingViewModel = (onFinish) => {
  const { user, login: authLogin, logout } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const validateEmail = (email) => {
     const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
  };
  const validatePassword = (password) => {
    // ejemplo: mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
  };
  

 
  const navigation = useNavigation();

  

   const login = async () => {
     if ( !email || !password) {
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
    try {
      setCargando(true);
      const result = await loginUsuario(email, password);
      if (result.success) {
        setMensaje(`Bienvenido ${result.user.firstname} ✅`);
        await authLogin(result.user);
        if (onFinish) await onFinish();
        setTimeout(() => {
          navigation.replace("MainTabs", { screen: "Home" });
        }, 1000);
      } else {
        setMensaje(result.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMensaje("An unexpected error occurred ❌");
    } finally {
      setCargando(false);
    }
    };
  
  


  return {
    email,
    password,
    mensaje,
    cargando,
    setfirstname,
    setEmail,
    setPassword,
    login,
    logout,   
    user,
    isEmailValid,
    isPasswordValid,
    isPasswordVisible,
    setIsPasswordVisible,
  

  };
}
