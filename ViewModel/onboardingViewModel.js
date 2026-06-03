import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from "react";
import { Alert } from 'react-native';
import { useLoginUsuario } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';



export const useOnboardingViewModel = (onFinish) => {
  const { user, login: authLogin, logout } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

 // Function for managing the login process
   const iniciarseccion ={
    
   } = async () => {
     if ( !email || !password) {
      Alert.alert("Please complete all fields ❌");
      return;
     }
  
     if (!isEmailValid) {
      Alert.alert("Invalid email format ❌");
      return;
     }
  
     if (!isPasswordValid) {
      Alert.alert("Password does not meet requirements ❌");
      return;
     }
     // We call the login mutation with the email and password, and handle the response (managed of cache)
     loginMutation.mutate(
      { email, password },
      {
      onSuccess: async (result) => {
      if (result.success) {
        Alert.alert(`Bienvenido ${result.user.firstname} ✅`);
        await authLogin({
         email: result.user.email,
         firstname: result.user.firstname
        });
        onFinish && onFinish();
         } else {
           if (result.code === "USER_NOT_FOUND") {
            Alert.alert(
            "User not found ❌",
           "This email is not registered. Please sign up first."
            );

           navigation.replace("MainTabs", { screen: "Profile" });
          } else {
          Alert.alert(result.message);
         }
       }
      },
         onError: () => {
         Alert.alert("An unexpected error occurred ❌");
         },
      }
    );
   } 


  return {
    email,
    password,
    setEmail,
    setPassword,
    cargando: loginMutation.isPending,
    iniciarseccion ,
    isEmailValid,
    isPasswordValid,
    isPasswordVisible,
    setIsPasswordVisible,
  

  };
}
