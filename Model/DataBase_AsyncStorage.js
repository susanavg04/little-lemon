import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from "react-native";

// Data persistence using AsyncStorage, including users and profiles.
export const guardarUsuario = async (user) => {
    try {
      await AsyncStorage.setItem(`user_${user.email}`, JSON.stringify(user));
      return true;
    } catch (e)  {
      console.error('Error al guardar los datos', e);
      return false
      
    };
  };

 // Function to add a user via email 
export const cargarUsuario = async (email) => {
  try {
    const data = await AsyncStorage.getItem(`user_${email}`);
    if (!data) return null; 
    const user = JSON.parse(data);
    return user;
  } catch (e) {
    console.error("Error al cargar usuario ❌", e);
    return null;
  }
};
//The loginUser function is used to validate a user's login using their email address and password.
export const loginUsuario = async (email, password) => {
  try {
    const user = await cargarUsuario(email);
    if (!user) return {         
        success: false, 
        code: "USER_NOT_FOUND",
        message: "Usuario no encontrado" };

    if (user.password === password) {
      return { success: true, user };
    } else {
      return { success: false, code: "INCORRECT_PASSWORD", message: "Contraseña incorrecta" };
    }
  } catch (e) {
    console.error("Error en login ❌", e);
    return { success: false, code: "INTERNAL_ERROR", message: "Error interno" };
  }
};
// The saveProfile function is used to save or update a user's profile information in AsyncStorage based on their email address.
export const saveProfile = async (email, perfil)=> {
   try {
    if (!email) throw new Error("No se puede guardar perfil sin email");
    
    const datosExistentes = await cargarUsuario(email) || {};

    const perfilActualizado = { ...datosExistentes, ...perfil };

    await AsyncStorage.mergeItem(`user_${email}`, JSON.stringify(perfilActualizado));
    
    console.log("Perfil actualizado correctamente ✅");
  } catch (error) {
    console.error('Error saving profile:', error);
    Alert.alert('Error', 'Profile could not be saved');
  }  
    };   
    // The deleteProfile function is used to delete a user's profile based on their email address.
export const deleteProfile =  async(email) => {
       
        try {

          if (!email) throw new Error("No se puede eliminar perfil sin email");
          await AsyncStorage.removeItem(`user_${email}`);
         } catch (error) {
          console.error('Error deleting data:',error);
          Alert.alert('Error', 'Data could not be deleted');
        }
  };
    // The uploadImage function is used to save a user's profile image URI in AsyncStorage based on their email address.
export const uploadImage = async (uri, email) => {
   try {
         
    if (!email) throw new Error("No se puede guardar imagen sin email");
         
      const perfilActual = await cargarUsuario(email);
      const nuevoPerfil = {
        ...perfilActual,
           imagenUri: uri,
      };
      await saveProfile(email, nuevoPerfil);
         
      console.log('Imagen guardada en AsyncStorage:', uri);
      return uri;
      } catch (error) {
      console.error('Error guardando imagen:', error);
    }

    };    
 // The obtenerPasswordLocal function is used to retrieve a user's password from AsyncStorage based on their email address.
 export const obtenerPasswordLocal = async (email) => {
  try {
      const usuario = await cargarUsuario(email);
      if (usuario && usuario.password) {
        return usuario.password;
      }
        return null;
        } catch (e) {
        console.error("Error al obtener password", e);
       return null;
       }
     };    
// Custom hooks for React Query to manage user data and profiles.
 export const useUsuario = (email) => {
   return useQuery({
        queryKey: ['user', email],
        queryFn: () => cargarUsuario(email),
        enabled: !!email,
       });
    };    

export const useLoginUsuario = () => {
  return useMutation({
    mutationFn: ({ email, password }) => loginUsuario(email, password),
  });
};

export const useSaveProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, perfil }) => saveProfile(email, perfil),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['user', variables.email]);
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email) => deleteProfile(email),
    onSuccess: (_, email) => {
      queryClient.removeQueries(['user', email]);
    },
  });
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ uri, email }) => uploadImage(uri, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['user', variables.email]);
    },
  });
};
