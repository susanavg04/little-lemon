import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { cargarUsuario, deleteProfile, saveProfile } from "../Model/DataBase_AsyncStorage";

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
    const fetchUserData = async () => {
        
        if (email) { 
            const userData = await cargarUsuario(email);

            if (userData) {
                
                setfirstname(userData.firstname || "");

            }
        }
    };

    fetchUserData(); 
}, [email]);
 
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

  // Subir imagen al servidor
  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append('avatar', {
      uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });
    try {
      const response = await fetch('https://TU_API_URL/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const result = await response.json();
      console.log('Imagen subida:', result);
      return result;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
  };
};