
import { StyleSheet, Text, TouchableOpacity } from "react-native";
const styles = StyleSheet.create({
  option: {
    flexDirection: 'row', // Para alinear los elementos horizontalmente
    justifyContent: 'space-between', // Para espaciar el contenido
    alignItems: 'center', // Para centrar verticalmente
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionName: {
    flex: 1, // Permite que el nombre ocupe el espacio restante
    fontSize: 16,
  },
  optionPrice: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    color: '#007AFF', // Un color típico para precios
  },
  optionIndicator: {
    fontSize: 18,
  }
});

export default function OptionSelector({ option, toggleOption }) {
  return (
    <TouchableOpacity onPress={toggleOption} style={styles.option}>
      <Text style={{ flex: 1 }}>{option.name}</Text>
      <Text>${option.price.toFixed(2)}</Text>
      <Text>{option.selected ? "✅" : "⬜"}</Text>
    </TouchableOpacity>
  );
}