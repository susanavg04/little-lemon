
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { AuthContext } from '../../ViewModel/AuthContext';
import { useProfileViewModel } from "../../ViewModel/Vm_profile";
import Header from '../components/Header';


export default function ProfileScreen() {
  const { user, loading } = useContext(AuthContext);

  const {
    firstname, setfirstname,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    password, setPassword,
    registrar,
    imagenUri, iniciales,
    notifications, handleToggle,
    handleSave, handleDiscard,
    seleccionarImagen,
     isPasswordVisible,
    setIsPasswordVisible,
    isEmailValid,
    isPasswordValid,
    errors,
    
  } = useProfileViewModel();  
   // Form for creating a new user profile 
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Header imagenUri={imagenUri} iniciales={iniciales}/>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagenUri ? (
          <Image source={{ uri: imagenUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.iniciales}>{iniciales}</Text>
          </View>
        )}
      </TouchableOpacity>
      {errors.imagen && (
       <Text style={styles.errorText}>{errors.imagen}</Text>
       )}
      <Text style={styles.title}>{`${firstname} ${lastName}`}</Text>
      <Text style={styles.sectionTitle}>Personal information</Text>
      <Text>Firstname</Text>
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        onChangeText={setfirstname}
      />
      {errors.firstname && (
      <Text style={styles.errorText}>{errors.firstname}</Text>
       )}
      <Text>Last name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      {errors.lastName && (
      <Text style={styles.errorText}>{errors.lastName}</Text>
       )}
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && (
      <Text style={styles.errorText}>{errors.email}</Text>
      )}

      <Text>Phone</Text>
       <MaskedTextInput
        mask="(999) 999-9999"
        placeholder="(123) 456-7890"
        style={styles.input}
        value={phone}
        onChangeText={(text, rawText) => setPhone(rawText)}
        keyboardType="phone-pad"
      />
      {errors.phone && (
      <Text style={styles.errorText}>{errors.phone}</Text>
       )}
      <Text>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
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
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
          )}
          
          {!isPasswordValid && password.length > 0 && (
          <Text style={{ color: "red", fontSize: 14 }}>
            Password must have at least 8 characters, 
            1 uppercase, 1 lowercase, 1 number and 1 special character.
          </Text>
               )}

      <Text style={styles.sectionTitle}>Email notifications</Text>
      {[
        { label: 'Order statuses', key: 'orderStatuses' },
        { label: 'Password changes', key: 'passwordChanges' },
        { label: 'Special offers', key: 'specialOffers' },
        { label: 'Newsletter', key: 'newsletter' },
      ].map((item) => (
        <View key={item.key} style={styles.checkboxContainer}>
          <Text>{item.label}</Text>
          <Switch
            value={notifications[item.key]}
            onValueChange={() => handleToggle(item.key)}
          />
        </View>

      ))}
      // Button to create a new user profile with the provided information
      <Pressable style={styles.registrarButton} onPress={async () => {
        await registrar();
      }}>
        <Text style={styles.registrarText}>CREATE PROFILE</Text>
      </Pressable>

      <View style={styles.footerButtons}>
        // Buttons to  discard them
        <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
          <Text style={styles.discardText}>Clean Data</Text>
        </TouchableOpacity>
        // Button to save changes 
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    paddingBottom:40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginVertical: 10,
  },

    placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  iniciales: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  registrarButton: {
    backgroundColor: '#fcd200',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  registrarText: {
    fontWeight: 'bold',
    color: '#000',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  discardButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    flex: 0.45,
    alignItems: 'center',
  },
  discardText: {
    color: '#495E57',
  },
  saveButton: {
    backgroundColor: '#495E57',
    padding: 12,
    borderRadius: 6,
    flex: 0.45,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
  errorText: {
  color: "red",
  fontSize: 12,
  marginBottom: 8,
  },
});



