import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { Alert } from 'react-native';
import { guardarUsuario, useSaveProfile, useUploadImage, useUsuario } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';

export const useProfileViewModel = () => {
  const { user, logout: authLogout, setUser } = useContext(AuthContext);

  
  const validateEmail = (email) => {
     const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
  };
  
  const validatePassword = (password) => {
    // ejemplo: mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
  };
  const [email, setEmail] = useState(user?.email || "");
  const [firstname, setfirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [imagenUri, setImagenUri] = useState(null);
  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const { data: userData, isLoading } = useUsuario(email);
   const saveProfileMutation = useSaveProfile();
   const uploadImageMutation = useUploadImage();
   const handleLogout = () => { authLogout();};
   const isEmailValid = validateEmail(email);
   const isPasswordValid = validatePassword(password);
   const [errors, setErrors] = useState({});
   const iniciales = `${firstname?.[0] || ""}${lastName?.[0] || ""}`;
   const validateForm = () => {
    let newErrors = {};
   if (!firstname) newErrors.firstname = "Firstname is required";
   if (!lastName) newErrors.lastName = "Last name is required";
   if (!email) newErrors.email = "Email is required";
   else if (!isEmailValid) newErrors.email = "Invalid email";
   if (!phone) newErrors.phone = "Phone is required";
   if (!password) newErrors.password = "Password is required";
   else if (!isPasswordValid)
    newErrors.password =
      "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char";
   if (!imagenUri) newErrors.imagen = "Profile image is required";
     setErrors(newErrors);

   return Object.keys(newErrors).length === 0;
  };

  const registrar = async () => {
      const isValid = validateForm();
     if (!isValid) {
    return false; 
     }
     try {
      const success = await guardarUsuario({ firstname, email, password, lastName, phone, imagenUri, notifications });
     
      if (success) {
        Alert.alert(
        "Éxito",
        "PERFIL GUARDADO EXITOSAMENTE ✅");
        return true;
       } else {
        Alert.alert("Error", "No se pudo guardar ❌");
        return false;
       }
       
      } catch (error) {
       console.error("Error registering user:", error);
       Alert.alert("Error", "Unexpected error ❌");
       return false;
      }
    };

// When user information is received, load the profile
  useEffect(() => {
  if (userData) {
    setfirstname(userData.firstname || "");
    setLastName(userData.lastName || "");
    setPhone(userData.phone || "");
    setImagenUri(userData.imagenUri || null);
    setNotifications(userData.notifications || {
     orderStatuses: true,
     passwordChanges: true,
     specialOffers: true,
      newsletter: true,
     });
    setPassword(userData.password || "");
  }
}, [userData]);

 
  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };
// When user create the profile and click save, update the profile in AsyncStorage and cache
  const handleSave = async () => {
    
    const perfil = {
      firstname,
      lastName,
      email,
      phone,
      imagenUri,
      notifications,
      password, 
    };
    saveProfileMutation.mutate(
    { email, perfil },
    {
           onSuccess: () => {
        Alert.alert("Success", "Changes saved successfully ✅");
      },
      onError: () => {
        Alert.alert("Error", "Could not save changes ❌");
      },
    }
  );  
  };

// When user create the profile and click discard, reset all fields to initial values
  const handleDiscard = async () => {
    setfirstname("");
    setLastName("");
    setPassword("");
    setEmail("");
    setPhone("");
    setImagenUri(null);
    setNotifications({
      orderStatuses: true,
      passwordChanges: true,
      specialOffers: true,
      newsletter: true,
    } )
  };

  const seleccionarImagen = async () => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a las imágenes.");
      return;
    }
    try {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      const uriSeleccionada = resultado.assets[0].uri;
      
      setImagenUri(uriSeleccionada);
      setUser((prev) => ({
      ...prev,
      imagenUri: uriSeleccionada,
     }));
      
     uploadImageMutation.mutate(
     { uri: uriSeleccionada, email },
     {
       onSuccess: () => {
        console.log("Imagen guardada en cache + storage ✅");
       },
      }
    );
  }
    } catch (error) {
    console.error("Error al seleccionar imagen:", error);
  }
 };


  return {
    firstname,
    setfirstname,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    imagenUri,
    iniciales,
    registrar,
    notifications,
    handleToggle,
    handleSave,
    handleDiscard,
    seleccionarImagen,
    handleLogout, 
    logout: handleLogout,
    isPasswordVisible,
    setIsPasswordVisible,
    isEmailValid,
    isPasswordValid,
    errors,
  };
    }
