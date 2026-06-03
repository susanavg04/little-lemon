import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { obtenerPasswordLocal } from '../../Model/DataBase_AsyncStorage';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

    // Password recovery function using AsyncStorage.
  const recuperarPasswordPractica = async (email) => {
  if (!email) {
    return { success: false, message: "Por favor, escribe un email." };

  }
  const passwordEncontrada = await obtenerPasswordLocal(email);

  if (passwordEncontrada) {
    return { 
      success: true, 
      message: `¡Usuario encontrado! Tu contraseña guardada es: ${passwordEncontrada}` 
    };
  } else {
    return { 
      success: false, 
      message: "No se encontró ningún usuario con ese correo en este dispositivo." 
    };
  }
};
// Handler for the "Recuperar Contraseña" button.
  const handleRecuperar = async () => {
    
    const result = await recuperarPasswordPractica(email);
    
    Alert.alert(
      result.success ? "Éxito" : "Error",
      result.message
    );
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={() => handleRecuperar()}>
        <Text style={styles.buttonText}>Recover Password </Text>
      </TouchableOpacity>
    </View>
  );
}

  const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#495E57', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 15 
  },
  button: { 
    backgroundColor: '#F4CE14', 
    padding: 15, 
    borderRadius: 5 
  },
  buttonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  }

});

export default ForgotPasswordScreen;
