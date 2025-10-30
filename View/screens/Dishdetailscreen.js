
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OptionSelector from "../components/Optionselector";
import QuantitySelector from "../components/Quantityselector";
import { useDishDetailViewModel } from "../ViewModel/useDishDetailViewModel";

export default function DishDetailScreen({ route, navigation }) {
  const { dishId } = route.params; // viene del menu
  const {
    dish,
    quantity,
    options,
    toggleOption,
    increaseQuantity,
    decreaseQuantity,
    addToCart
  } = useDishDetailViewModel(dishId);

  const dishImages = {
  "Bruschetta": require("./assets/images/Bruschetta.png"),
  "Greek salad": require("./assets/images/Greek salad.png"),
  "Pasta": require("../assets/images/Pasta.png"),
  "Grilled fish": require("./assets/images/Grilled fish.png"),
  "Lemon dessert": require("../assets/images/Lemon dessert.png"),
};

  if (!dish) return <Text>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={dishImages[dish.title]} style={styles.image} />
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.description}>{dish.price}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
       <Image
         source={require("../assets/images/Delivery van.png")}
         style={{ width: 24, height: 24, marginRight: 8 }}
         resizeMode="contain"
         />
       <Text style={ styles.delivery }>
         Delivery time: 20 minutes
       </Text>
      </View>

      <Text style={styles.subtitle}>Add</Text>
      {options.map((opt, index) => (
        <OptionSelector
          key={index}
          option={opt}
          toggleOption={() => toggleOption(index)}
        />
      ))}

      <QuantitySelector
        quantity={quantity}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
      />
      <TouchableOpacity 
        onPress={() => {
        addToCart();
        navigation.navigate("Cart")}} style={styles.viewCart}>
        <Text style={{ color: "blue" }}>View Cart</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 180, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, color: "#555", marginBottom: 8 },
  delivery: { fontSize: 14, color: "#333", marginBottom: 12 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
  viewCart: { alignItems: "center", marginTop: 12 },
});