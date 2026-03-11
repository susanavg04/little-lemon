
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Usedishdetailviewmodel from "../../ViewModel/Usedishdetail";
import Button from "../components/Button";
import OptionSelector from "../components/Optionselector";
import QuantitySelector from "../components/Quantityselector";


export default function Dishdetailscreen({ route, navigation }) {
  const { dishId } = route.params; // viene del menu
  const {
    dish,
    quantity,
    options,
    toggleOption,
    increaseQuantity,
    decreaseQuantity,
    addToCart
  } = Usedishdetailviewmodel(dishId);

  const dishImages = {
 "Bruschetta": require('../../assets/images/Bruschetta.png'),
 "Hummus": require('../../assets/images/Pasta.png'),
  "Greek" : require('../../assets/images/Greek salad.png'),
  "Grilled" : require('../../assets/images/Grilled fish.png'),
  "Spinach Artichoke Dip" : require('../../assets/images/Spinach.png'),
  "Fried Calamari Rings" : require('../../assets/images/Fried Calamari.png'),
  "Fried Mushroom" : require('../../assets/images/Fried Mushrooms.png'),
  "Caesar" : require('../../assets/images/Caesar.png'),
  "Tuna Salad" : require('../../assets/images/Tuna salad.png'),
  "Grilled Chicken Salad" : require('../../assets/images/Grilled Chicken Salad.png'),
  "Water" : require('../../assets/images/Water.png'),
  "Coke" : require('../../assets/images/Coke.png'),
  "Beer" : require('../../assets/images/Beer.png'),
  "Iced Tea" : require('../../assets/images/Icea Tea.png'),
};

  if (!dish) return <Text>Cargando...</Text>;

  // Calcular el precio total con adiciones y cantidad
  const selectedOptions = options.filter(opt => opt.selected);
  const additionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = (parseFloat(dish.price) + additionsTotal) * quantity;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={dishImages[dish.title]} style={styles.image} />
      <Text style={styles.title}>{dish.title}</Text>
      <Text style={styles.description}>${totalPrice.toFixed(2)}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
       <Image
         source={require("../../assets/images/Delivery van.png")}
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
      <View style={styles.centeredRow}>
        <QuantitySelector
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      </View>
      <View style={styles.centeredRow}>
        <Button
          title="ADD TO CART"
          onPress={async() => {
            await addToCart();
            navigation.navigate("Cart");
          }}
        />
      </View>

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
  centeredRow: { alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 12 },
});