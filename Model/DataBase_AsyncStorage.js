import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import {
  email,
  firstname,
  imagenUri,
  lastName,
  notifications,
  phone
} from './ViewModel/VM_Profile';

  export const guardarUsuario = async (user) => {
    try {
      await AsyncStorage.setItem(`nombre_${user.email}`, JSON.stringify(user.firstname));
      await AsyncStorage.setItem(`email_${user.email}`, JSON.stringify(user.email));
      await AsyncStorage.setItem(`password_${user.email}`, JSON.stringify(user.password));
      return true;
    } catch (e)  {
      console.error('Error al guardar los datos', e);
      return false
      
    };
  };

  // Cargar usuario por email
export const cargarUsuario = async (email) => {
  try {
    const nombre = await AsyncStorage.getItem(`nombre_${email}`);
    const correo = await AsyncStorage.getItem(`email_${email}`);
    const password = await AsyncStorage.getItem(`password_${email}`);

    if (nombre && correo && password) {
      return { firstname: nombre, email: correo, password };
    }
    return null;
  } catch (e) {
    console.error("Error al cargar usuario ❌", e);
    return null;
  }
};

export const loginUsuario = async (email, password) => {
  try {
    const user = await cargarUsuario(email);
    if (!user) return { success: false, message: "Usuario no encontrado" };

    if (user.password === password) {
      return { success: true, user };
    } else {
      return { success: false, message: "Contraseña incorrecta" };
    }
  } catch (e) {
    console.error("Error en login ❌", e);
    return { success: false, message: "Error interno" };
  }
};

 export const saveProfile = async ()=> {
     
      try {
        const perfil = {
          firstname,
          lastName,
          email,
          phone,
          imagenUri,
          notifications,
        };
        await AsyncStorage.setItem(`perfil-${email}`,JSON.stringify(perfil));
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving profile:", error);
      }}
    
  export const deleteProfile =  async() => {
       
        try {
    
          await AsyncStorage.removeItem(`perfil-${email}`);
         } catch (error) {
          console.error('Error deleting data:',error);
          Alert.alert('Error', 'Data could not be deleted');
        }
      
  

};
         