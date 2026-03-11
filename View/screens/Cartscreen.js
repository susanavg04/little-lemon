import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCartTotals, removeItemFromCart } from "../../Model/Cartservices";

export default function Cartscreen() {
  const [cartData, setCartData] = useState({ cart: [], subtotal: 0, delivery: 0, service: 0, total: 0 });


  const loadCart = async () => {
    try {
    const data = await getCartTotals();
    setCartData(data);

    } catch(error){
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>ITEMS</Text>
      </View>
         <View style={styles.listContainer}></View>
         <FlatList
           data={cartData.cart}
           extraData={cartData}
           keyExtractor={(item) => item.id.toString()}
           renderItem={({ item }) => (
             <View style={styles.cartItem}>
               <Text style={styles.itemText}>{item.quantity} X {item.title}</Text>
               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                 <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                 <TouchableOpacity 
                   onPress={async () => { await removeItemFromCart(item.id); await loadCart(); }}
                   style={{ marginLeft: 10 }}
                 >
                  <Text style={{ color: "red", fontSize: 15 }}>✕</Text>
                 </TouchableOpacity>
           </View> 
        </View>
          )}
        />    

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${cartData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>${cartData.delivery.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service</Text>
          <Text style={styles.summaryValue}>${cartData.service.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, { marginTop: 15 }]}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>${cartData.total.toFixed(2)}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CHECK OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  

  button: { backgroundColor: "#FFD700", padding: 16, borderRadius: 10, marginTop: 20 },
  buttonText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  headerSection: {
    backgroundColor: "#A9B3AC", // El color gris verdoso de la imagen
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: -20, // Para que el fondo gris llegue a los bordes
    marginBottom: 10,
  },
  headerTitle: {
    color: "#333",
    fontWeight: "800",
    fontSize: 16,
  },
  listContainer: {
    flex: 1, // Esto empuja el resumen hacia abajo
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 17,
    color: "#495E57",
  },
  itemPrice: {
    fontSize: 17,
    color: "#495E57",
  },
  summaryContainer: {
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: "#EDEFEE",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  summaryValue: {
    fontSize: 18,
    color: "#333",
  },
  totalLabel: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },

  
});
