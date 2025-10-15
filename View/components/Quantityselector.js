
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDecrease} style={styles.btn}><Text>-</Text></TouchableOpacity>
      <Text style={styles.text}>{quantity}</Text>
      <TouchableOpacity onPress={onIncrease} style={styles.btn}><Text>+</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  btn: { padding: 10, borderWidth: 1, borderRadius: 6, marginHorizontal: 6 },
  text: { fontSize: 18 }
});