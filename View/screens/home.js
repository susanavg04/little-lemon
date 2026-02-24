import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import {
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHomeViewModel } from '../../ViewModel/Utils';
import Filters from '../components/Filter';
import Header from '../components/Header';

const sections = ['Appetizers', 'Salads', 'Beverages'];

const Item = ({ title, price }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemTitle}>{title}</Text>
    <Text style={styles.itemPrice}>${price}</Text>
  </View>
);
const images = {
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

export default function Home() {
  const navigation = useNavigation();
  const searchBarRef = useRef(null);

  const {
    data,
    sections: MENU_SECTIONS,
    searchBarText,
    handleSearchChange,
    filterSelections,
    handleFiltersChange,
  } = useHomeViewModel();
  
 
  
    const renderHeader = () => (
    <View>
       <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Little Lemon</Text>
          <Text style={styles.heroSubtitle}>Chicago</Text>
          <View style={styles.heroContent}>
            <Text style={styles.heroDescription}>
               We are a family owned Mediterranean restaurant focused on traditional recipes served with a modern twist.
            </Text>
            <Image
              style={styles.heroImage}
              source={require('../../assets/images/Hero image.png')} 
              resizeMode="cover"
            />
        </View>
        

       <Searchbar
        placeholder="Search"
        placeholderTextColor="#ffffff"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="#495E57"
        inputStyle={{ color: '#495E57' }}
        elevation={0}
         autoFocus={false}
         onSubmitEditing={() => {
      // Aquí puedes cerrar el teclado si quieres
         searchBarRef.current?.blur();
    }}
      />
       </View>
       <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>
           <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
          />
        </View>
    </View>
    );
    const renderHeaderContent = () => (
    <View>
      <Header />
      {renderHeader()} 
    </View>
  );
      return (
       
      <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeaderContent}
        renderItem={({ item }) => (
            <Pressable 
              style={styles.itemContainer}
              onPress={() => navigation.navigate("Dishdetailscreen", { dishId: item.id })}
            >
             <View style={styles.itemTextContainer}>
               <Text style={styles.itemTitle}>{item.title}</Text>
               <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
               </Text>
               <Text style={styles.itemPrice}>${item.price}</Text>
             </View>
             <Image 
              source={images[item.title]} 
              style={styles.itemImage} 
             />
          </Pressable>
          
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      </SafeAreaView>
      
      ) 
    };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // --- SECCIÓN HERO (BANNER VERDE) ---
  heroSection: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
   headerContainer:{
    backgroundColor: '#F4CE14'

  },
  headerText: {
    fontSize: 20,
    color: '#Ffffff',
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Regular'

  },

   heroTitle: {
    fontSize: 45,
    color: '#F4CE14',
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Regular', 
    marginBottom: -10, 
  },
  heroSubtitle: {
    fontSize: 30,
    color: '#EDEFEE',
    fontFamily: 'MarkaziText-Regular',
    marginBottom: 15,
  },
  heroContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroDescription: {
    fontSize: 16,
    color: '#EDEFEE',
    flex: 1,
    paddingRight: 15,
    lineHeight: 22,
    fontFamily: "Karla-Regular",
  },
  heroImage: {
    width: 130,
    height: 140,
    borderRadius: 16,
  },
  searchBar: {
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    height: 50,
    elevation: 0, 
  },

  // --- SECCIÓN DELIVERY Y FILTROS ---
  deliveryContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333333',
    marginBottom: 15,
    textTransform: 'uppercase', 
    fontFamily: "Karla-Regular",
  },

  // --- LISTADO DE PLATOS (SECTIONLIST) ---
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    fontFamily: "Karla-Regular",
  },
  itemDescription: {
    fontSize: 14,
    color: '#495E57',
    lineHeight: 20,
    fontFamily: "Karla-Regular",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495E57',
    marginTop: 10,
    fontFamily: "Karla-Regular",
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEFEE',
    marginHorizontal: 20,
  },
});




