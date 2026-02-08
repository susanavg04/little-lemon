import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({onPress, title, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    backgroundColor: '#F4CE14',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
  },
  disabled: {
    backgroundColor: 'white',
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: "Karla",
  }
});

export default Button;