import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { cargarUsuario, saveProfile, uploadImage } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';

export const useProfileViewModel = () => {
  const { user, logout: authLogout, setUser } = useContext(AuthContext);

  const [firstname, setfirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [imagenUri, setImagenUri] = useState(null);
  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
 

  const iniciales = `${firstname?.[0] || ""}${lastName?.[0] || ""}`;

useEffect(() => {
  
  const fetchUserData = async () => {
    if (email) { 
      const userData = await cargarUsuario(email);
      if (userData) {
        setfirstname(userData.firstname || "");
        setLastName(userData.lastName || "");
        setPhone(userData.phone || "");
        setImagenUri(userData.imagenUri || null);
        setNotifications(userData.notifications || notifications);
        setPassword(userData.password || "");
      }
    }
  };
  fetchUserData(); 
  
}, [email]);
 
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
    await saveProfile(email, perfil);
    Alert.alert("Success", "Changes saved successfully ✅");
  };
  const handleLogout = async () => {
    
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
    });

    await authLogout();
  };

  const handleDiscard = async () => {
    if (email) {
      const userData = await cargarUsuario(email);
      if (userData) {
        setfirstname(userData.firstname);
        setLastName(userData.lastName);
        setPhone(userData.phone);
        setImagenUri(userData.imagenUri);
        setNotifications(userData.notifications);
        setPassword(userData.password);
      }
    } 

   
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
      
    
      await uploadImage(uriSeleccionada, email); 
      console.log("Imagen seleccionada con éxito:", uriSeleccionada);
    }
   } catch (error) {
    console.error("Error al abrir la galería:", error);
    alert("Hubo un error al intentar abrir la galería.");
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
    notifications,
    handleToggle,
    handleSave,
    handleDiscard,
    seleccionarImagen,
    handleLogout, 
    logout: handleLogout,
  };
};