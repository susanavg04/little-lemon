import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';



export default function ProfileScreen() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();

  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

    useEffect(() => {
    const cargarDatos = async () => {
      try {
        const nombreGuardado = await AsyncStorage.getItem('usuario_nombre');
        const correoGuardado = await AsyncStorage.getItem('usuario_correo');
      if (nombreGuardado) setFirstName(nombreGuardado);
      if (correoGuardado) setEmail(correoGuardado);

      } catch (e) {
        console.error('Error al cargar los datos', e);
      }
    };

    cargarDatos();
  }, []);

  const iniciales = `${firstName[0]}${lastName[0]}`;

  const [imagenUri, setImagenUri] = useState(null);

  const seleccionarImagen = async () => {
    // Pedir permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para acceder a las imágenes.");
      return;
    }

    // Abrir selector
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagenUri(resultado.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagenUri ? (
          <Image source={{ uri: imagenUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.iniciales}>{iniciales}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.firstName}>{`${firstName} ${lastName}`}</Text>
    </View>
  );
  
}

