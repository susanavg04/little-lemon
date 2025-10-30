import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Filters from './View/components/Filter';
import Header from './View/components/Header';
import { useHomeViewModel } from './ViewModel/Utils';

const sections = ['Appetizers', 'Salads', 'Beverages'];

const Item = ({ title, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
  </View>
);

export default function Home() {

  const navigation = useNavigation();

  const {
    data,
    sections: MENU_SECTIONS,
    searchBarText,
    handleSearchChange,
    filterSelections,
    handleFiltersChange,
  } = useHomeViewModel();
  
 
  return (
      
    <SafeAreaView style={styles.container}>
     <Header />
      <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Image
          style={styles.image}
          source={require('./assets/images/logo.png')}
          resizeMode="cover"
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />

       <Text style={styles.headerText}>Little Lemon</Text>
      </View>
       <Text style={styles.regularText}>
        We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.
       </Text>
      
      <Pressable
        onPress={() => navigation.navigate('Profile')}
        style={styles.button}>
        <Text style={styles.buttonText}>Profile</Text>
      </Pressable>
      
    </ScrollView>
  

      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: 'white' }}
        elevation={0}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate("DishDetail", { dishId: item.id })}>
            <Item title={item.title} price={item.price} />
            </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  headerText: {
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  container2: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#495E57',
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});

