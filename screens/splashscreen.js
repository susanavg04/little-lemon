import { Image, View } from "react-native";
export default function splashscreen  () {
  
  return (
    <View style={styles.container}>
      
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
    
      </View>
      
  )
}
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
},


logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 32,
    },
});
    