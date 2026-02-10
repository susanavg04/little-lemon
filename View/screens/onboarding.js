
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useOnboardingViewModel } from "../../ViewModel/Onboardingviewmodel";
import Button from "../components/Button";


export default function Onboarding ({ navigation, onFinish })  {

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

  } = useOnboardingViewModel(onFinish);


  return (
    <View style={styles.container}>
      <View style= {styles.section1}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/logo.png')}
      />
      </View>
      <View style= {styles.section2}>
      <Text style={styles.title1}>
        Hello!!
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
      <Button title="Crear Perfil" onPress= {async () => {
       const success = await registrar(); 
       if (success) onFinish(); 
       }} />
      <View style={{ height: 12 }} />
      <Button title="Login in" onPress= {async () => {
       const success = await login(); 
       if (success) onFinish();
       navigation.navigate('Home');
       }} 
      />
      

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
    backgroundColor: '#495E57',
    padding: 20,
    borderRadius: 10,
  },
  section2: {
    flex: 5, 
    backgroundColor: '#495E57',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10, // Añadimos margen inferior para separar del área amarilla
  },
  section3:{
    flex: 3,
    justifyContent: 'center', // Centra los botones verticalmente en su sección
    paddingVertical: 10,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Karla",
  },
    title1: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "MarkaziText",
    fontWeight: "bold",
  },
  logo: {
    height: 100, // Tamaño más razonable para un logo superior
    width: '100%',
    resizeMode: "contain",

  },
  input: {
    height: 40,
    marginVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#EDEFEE",
    fontFamily: "Karla",
  },
});


