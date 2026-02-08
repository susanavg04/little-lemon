import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { deleteProfile, saveProfile } from "../Model/DataBase_AsyncStorage";

export const useProfileViewModel = () => {

  const [firstname, setfirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
     const cargarDatos = async () => {
       try {
         const nombreGuardado = await AsyncStorage.getItem(`user_${user.email}`);
         const correoGuardado = await AsyncStorage.getItem(`user_${user.email}`);
       if (nombreGuardado) setfirstname(nombreGuardado);
       if (correoGuardado) setEmail(correoGuardado);
 
       } catch (e) {
         console.error('Error al cargar los datos', e);
       }
     };
 
     cargarDatos();
   }, []);

  const handleToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSave = async () => {
    const perfil = { firstname, lastName, email, phone, imagenUri, notifications };
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
    imagenUri,
    iniciales,
    notifications,
    handleToggle,
    handleSave,
    handleDiscard,
    seleccionarImagen,
  };
};