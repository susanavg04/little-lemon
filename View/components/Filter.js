import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  //This code uses `map()` to iterate through an array called `sections` and create a `TouchableOpacity` component for each element.
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={section}
          onPress={() => {
            onChange(index);
          }}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            backgroundColor: selections[index] ? '#f5e725ff' : '#495E57',
            borderWidth: 1,
            borderColor: 'white',
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'black' : 'white' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default Filters;

