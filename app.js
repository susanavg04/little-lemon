import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { AuthProvider } from './ViewModel/AuthContext';


import Cartscreen from "./View/screens/Cartscreen";
import Dishdetailscreen from "./View/screens/Dishdetailscreen";
import Home from './View/screens/Home';
import Onboarding from "./View/screens/Onboarding";
import ProfileScreen from './View/screens/Profile';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const queryClient = new QueryClient();




function App() {

    const [fontsLoaded] = useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
    MarkaziText: require('./assets/fonts/MarkaziText-Regular.ttf'),
  });

   function HomeStackNavigator() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="HomeMain" component={Home} options={{ headerShown: false }} />
        <HomeStack.Screen 
          name="Dishdetailscreen" 
          component={Dishdetailscreen} 
          options={{ title: 'Menu' }}
        />
      </HomeStack.Navigator>
    );
   }


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Login') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // Retornamos el componente del icono
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',   // Color cuando está seleccionado
        tabBarInactiveTintColor: 'gray',   // Color cuando no está seleccionado
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Cart" component={Cartscreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={Onboarding} />
    </Tab.Navigator>
  );
}

   
    return (
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName="MainTabs" 
            >
            <Stack.Screen name="MainTabs" component={MainTabs} />
             <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
      </QueryClientProvider>
    );

}

export default App;