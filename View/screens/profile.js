
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { useProfileViewModel } from "../ViewModel/VM_Profile";
import Header from '../component/Header';


export default function ProfileScreen({navigation}) {

 const {
    firstName, setfirstName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    imagenUri, iniciales,
    notifications, handleToggle,
    handleSave, handleDiscard,
    seleccionarImagen,
  } = useProfileViewModel();  
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <Header/>
      <TouchableOpacity onPress={seleccionarImagen}>
        {imagenUri ? (
          <Image source={{ uri: imagenUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.iniciales}>{iniciales}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{`${firstName} ${lastName}`}</Text>
      <Text style={styles.sectionTitle}>Personal information</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setfirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
       <MaskedTextInput
        mask="(999) 999-9999"
        placeholder="(123) 456-7890"
        style={styles.input}
        value={phone}
        onChangeText={(text, rawText) => setPhone(rawText)}
        keyboardType="phone-pad"
      />

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
      <Pressable style={styles.logoutButton} onPress={() => navigation.navigate ('Home')}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.discardButton} onPress={handleDiscard}>
          <Text style={styles.discardText}>Discard changes</Text>
        </TouchableOpacity>
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
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
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
  logoutButton: {
    backgroundColor: '#fcd200',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutText: {
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
    color: '#49SE57',
  },
  saveButton: {
    backgroundColor: '#49CE57',
    padding: 12,
    borderRadius: 6,
    flex: 0.45,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});



