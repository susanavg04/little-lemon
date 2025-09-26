import { Image, StyleSheet, View } from 'react-native';

export default function SplashScreen  ()  {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/imagen/logo.png")} // tu logo aquí
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // color de fondo de marca
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});