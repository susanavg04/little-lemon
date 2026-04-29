import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

  
export const cargarUsuario = async (email) => {
  try {
    const data = await AsyncStorage.getItem(`user_${email}`);
    if (!data) return null; // si no existe
    const user = JSON.parse(data);
    return user;
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
    
    const datosExistentes = await cargarUsuario(email) || {};

    const perfilActualizado = { ...datosExistentes, ...perfil };

    await AsyncStorage.mergeItem(`user_${email}`, JSON.stringify(perfilActualizado));
    
    console.log("Perfil actualizado correctamente ✅");
  } catch (error) {
    console.error('Error saving profile:', error);
    Alert.alert('Error', 'Profile could not be saved');
  }  
    };   
  export const deleteProfile =  async(email) => {
       
        try {

          if (!email) throw new Error("No se puede eliminar perfil sin email");
          await AsyncStorage.removeItem(`user_${email}`);
         } catch (error) {
          console.error('Error deleting data:',error);
          Alert.alert('Error', 'Data could not be deleted');
        }
  };

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
