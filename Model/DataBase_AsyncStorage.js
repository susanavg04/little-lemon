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

  export const guardarDatos = async (user) => {
    try {
      await AsyncStorage.setItem(`nombre-${email}`, user.firstname);
      await AsyncStorage.setItem(`email-${email}`, user.email);
      await AsyncStorage.setItem(`password-${email}`, user.password);
      
    } catch (e) {
      console.error('Error al guardar los datos', e);
    };
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
      }
         