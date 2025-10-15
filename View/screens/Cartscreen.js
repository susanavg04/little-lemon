import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCartTotals, removeItemFromCart } from "../Model/Cartservice";

export default function Cartscreen() {
  const [cartData, setCartData] = useState({ cart: [], subtotal: 0, delivery: 0, service: 0, total: 0 });

  const loadCart = async () => {
    const data = await getCartTotals();
    setCartData(data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>

      <FlatList
        data={cartData.cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.quantity} x {item.title}</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            <TouchableOpacity onPress={async () => { await removeItemFromCart(item.id); loadCart(); }}>
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text>Subtotal: ${cartData.subtotal.toFixed(2)}</Text>
        <Text>Delivery: ${cartData.delivery.toFixed(2)}</Text>
        <Text>Service: ${cartData.service.toFixed(2)}</Text>
        <Text style={styles.total}>TOTAL: ${cartData.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CHECK OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  item: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8 },
  summary: { marginTop: 20 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  button: { backgroundColor: "#FFD700", padding: 16, borderRadius: 10, marginTop: 20 },
  buttonText: { fontSize: 18, fontWeight: "bold", textAlign: "center" }
});
