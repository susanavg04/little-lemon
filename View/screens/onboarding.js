
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./View/components/Button";
import { useOnboardingViewModel } from "./ViewModel/OnboardingViewModel";

export default function Onboarding ()  {

  const {
    firstname,
    email,
    password,
    mensaje,
    setfirstname,
    setEmail,
    setPassword,
    registrar,
    login,
    isEmailValid,
    isPasswordValid,

  } = useOnboardingViewModel();


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

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
        autoCapitalize="none"
        autoCorrect={false}
      />
       
      {!isEmailValid && email.length > 0 && (
        <Text style={{ color: "red", fontSize: 14 }}>
         Please enter a valid email address.
        </Text>
      )}

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={setfirstname}
        keyboardType="default"
        textContentType="name"
        placeholder={"First Name"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          placeholder="Enter your password"
          autoCapitalize="none"
          autoCorrect={false}  
        />



         {!isPasswordValid && password.length > 0 && (
          <Text style={{ color: "red", fontSize: 14 }}>
            Password must have at least 8 characters, 
            1 uppercase, 1 lowercase, 1 number and 1 special character.
          </Text>
         )}
      </View>
      <View style= {styles.section3}>
      <Button title="Registrar" onPress={registrar} />
      <Button title="Login" onPress={login} />

      {mensaje ? <Text style={{ marginTop: 20 }}>{mensaje}</Text> : null}
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
    backgroundColor: '#49DE57',
    padding: 20,
    borderRadius: 10,
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
    borderColor: "#EDEFEE",
  },
});


