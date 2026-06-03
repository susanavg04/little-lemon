
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function OptionSelector({ option, toggleOption }) {
  // option: { name: string, price: number, selected: boolean }
  return (
    <TouchableOpacity onPress={toggleOption} style={styles.option}>
      <Text style={{ flex: 1 }}>{option.name}</Text>
      <Text>${option.price.toFixed(2)}</Text>
      <Text>{option.selected ? "✅" : "⬜"}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  option: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionName: {
    flex: 1, 
    fontSize: 16,
  },
  optionPrice: {
    marginHorizontal: 15,
    fontWeight: 'bold',
    color: '#007AFF', 
  },
  optionIndicator: {
    fontSize: 18,
  }
});
