import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { useSaveProfile, useUploadImage, useUsuario } from "../Model/DataBase_AsyncStorage";
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
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
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
   const [mensaje, setMensaje] = useState("");
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const { data: userData, isLoading } = useUsuario(email);
   const saveProfileMutation = useSaveProfile();
   const uploadImageMutation = useUploadImage();
   const handleLogout = () => {
   authLogout();
   };
 

  const iniciales = `${firstname?.[0] || ""}${lastName?.[0] || ""}`;

  const registrar = async () => {
     if (!firstname || !email || !password || !lastName || !phone || !imagenUri) {
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
      
      const success = await guardarUsuario({ firstname, email, password, lastName, phone, imagenUri, notifications });
      setMensaje(success ? "Registered user ✅" : "Error registering ❌");
      if (success) {

   
       }
      } catch (error) {
      console.error("Error registering user:", error);
      setMensaje("Unexpected error ❌");
      }
    };

    useEffect(() => {
  if (userData) {
    setfirstname(userData.firstname || "");
    setLastName(userData.lastName || "");
    setPhone(userData.phone || "");
    setImagenUri(userData.imagenUri || null);
    setNotifications(userData.notifications || notifications);
    setPassword(userData.password || "");
  }
}, [userData]);

 
  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

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
  };
    }
