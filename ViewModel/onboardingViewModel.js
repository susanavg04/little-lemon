import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from "react";
import { useLoginUsuario } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';


export const useOnboardingViewModel = (onFinish) => {
  const { user, login: authLogin, logout } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


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
    
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const loginMutation = useLoginUsuario();

  

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
     
     loginMutation.mutate(
      { email, password },
      {
      onSuccess: async (result) => {
      if (result.success) {
        setMensaje(`Bienvenido ${result.user.firstname} ✅`);
        await authLogin({
         email: result.user.email,
         firstname: result.user.firstname
        });
        if (onFinish) await onFinish();
        setTimeout(() => {
          navigation.replace("MainTabs", { screen: "Home" });
        }, 1000);
      } else {
        setMensaje(result.message);
      }
    },
          onError: () => {
        setMensaje("An unexpected error occurred ❌");
      },
    }
  );
};

  
  


  return {
    email,
    password,
    mensaje,
    cargando,
    setEmail,
    setPassword,
    login,
    cargando: loginMutation.isPending,
    logout,   
    user,
    isEmailValid,
    isPasswordValid,
    isPasswordVisible,
    setIsPasswordVisible,
  

  };
}
