import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";


  export const guardarUsuario = async (user) => {
    try {
      await AsyncStorage.setItem(`user_${user.email}`, JSON.stringify(user));
      return true;
    } catch (e)  {
      console.error('Error al guardar los datos', e);
      return false
      
    };
  };

  // Cargar usuario por email
export const cargarUsuario = async (email) => {
  try {
    const data = await AsyncStorage.getItem(`user_${email}`);
    if (!data) return null; // si no existe
    const user = JSON.parse(data);
    nombre = user.firstName;
    correo = user.email;
    password = user.password;
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

 export const saveProfile = async (email, perfil)=> {
     
      try {
        if (!email) throw new Error("No se puede guardar perfil sin email");
        await AsyncStorage.setItem(`perfil-${email}`,JSON.stringify(perfil));
        console.log("Data saved successfully");
      } catch (error) {
        console.error("Error saving profile:", error);
      }}
    
  export const deleteProfile =  async(email) => {
       
        try {

          if (!email) throw new Error("No se puede eliminar perfil sin email");
          await AsyncStorage.removeItem(`perfil-${email}`);
         } catch (error) {
          console.error('Error deleting data:',error);
          Alert.alert('Error', 'Data could not be deleted');
        }
      
  

};
         