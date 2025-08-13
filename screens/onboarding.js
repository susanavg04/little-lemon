import * as React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
import { validateEmail } from "../utils";

const onboarding = () => {
  const [email, setEmail] = React.useState('');
  const [name, setname] = React.useState('');

  const isEmailValid = validateEmail(email);

  const guardarDatos = async () => {
    try {
      await AsyncStorage.setItem('usuario_nombre', name);
      await AsyncStorage.setItem('usuario_correo', email);
      
    } catch (e) {
      console.error('Error al guardar los datos', e);
    };
  };
  return (
    <View style={styles.container}>
      <View style= {styles.section1}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      </View>
      <View style= {styles.section2}>
      <Text style={styles.title}>
        Let us get to know you
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setname}
        keyboardType="default"
        textContentType="name"
        placeholder={"First Name"}
      />
      </View>
      <View style= {styles.section3}>
      <Button
        onPress={guardarDatos}
        disabled={!isEmailValid}
      >
        Next
      </Button>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  section1: {flex:2},
  section2:{
    flex:5, 
    backgroundColor: '#49SE57',
  },
  section3:{flex:3},
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 32,
  },
  input: {
    height: 40,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
});

export default onboarding;
