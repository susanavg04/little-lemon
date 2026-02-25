import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { cargarUsuario, deleteProfile, saveProfile, uploadImage } from "../Model/DataBase_AsyncStorage";
import { AuthContext } from './AuthContext';

export const useProfileViewModel = () => {
  const { user, logout } = useContext(AuthContext);

  const [firstname, setfirstname] = useState("");
  const [lastName, setLastName] = useState("");

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
      }
    }
  };
  fetchUserData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [email]);
 
  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSave = async () => {
    // Guardar todos los datos necesarios para login y perfil
    const perfil = {
      firstname,
      lastName,
      email,
      phone,
      imagenUri,
      notifications,
      password, // importante para login
    };
    await saveProfile(email, perfil);
  };

  const handleDiscard = async () => {
    await deleteProfile(email);
  };
    const seleccionarImagen = async () => {
    // Pedir permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a las imágenes.");

  
 


      return;
    }

    // Abrir selector
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagenUri(resultado.assets[0].uri);
      await uploadImage(resultado.assets[0].uri); // Subir imagen tras seleccionar
    }
  };

  const [password, setPassword] = useState("");

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
    logout,
  };
};