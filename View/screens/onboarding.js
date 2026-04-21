
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useOnboardingViewModel } from "../../ViewModel/Onboardingviewmodel";
import Button from "../components/Button";

export default function Onboarding ({ navigation, onFinish })  {

  const {
    email,
    password,
    mensaje,
    cargando,
    setEmail,
    setPassword,
    login,
    logout,   
    user,
    isEmailValid,
    isPasswordValid,
    isPasswordVisible,
    setIsPasswordVisible,
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

      <View style={styles.passwordContainer}>
      <Text>Password</Text>
        <TextInput
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          textContentType="password"
          placeholder="Enter your password"
          autoCapitalize="none"
          autoCorrect={false}  
        />
        <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <MaterialCommunityIcons 
              name={isPasswordVisible ? "eye-off" : "eye"} 
              size={22} 
              color="#495E57" 
            />
          </TouchableOpacity>
          </View>

         {!isPasswordValid && password.length > 0 && (
          <Text style={{ color: "red", fontSize: 14 }}>
            Password must have at least 8 characters, 
            1 uppercase, 1 lowercase, 1 number and 1 special character.
          </Text>
         )}
      </View>
      <View style= {styles.section3}>
       <Button 
      title="Iniciar Sesión" 
      onPress={login}
      disabled={cargando}
      />
 
      <View style={{ height: 12 }} />
      <Pressable
       onPress={() => {
       if (user) {
         logout(); 
         navigation.replace("MainTabs", { screen: "Home" });
         } else {
           navigation.replace("MainTabs", { screen: "Profile" });
           }
        }}
>
          <Text style={[styles.link, { color: user ? "red" : "#007AFF" }]}>
          {user ? "Close Session" : "Sign Up"}
         </Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
         <Text style={styles.link}>Forgot my password</Text>
        </Pressable>
      

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
    link: {
    color: 'white',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginVertical: 10,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDEFEE",
    marginVertical: 15,
  },
  inputPassword: {
    flex: 1, // El input ocupa todo el espacio
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#495E57',
    fontFamily: "Karla",
  },
  eyeIcon: {
    paddingHorizontal: 10,
}
});


