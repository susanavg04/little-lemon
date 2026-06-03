import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { AuthProvider } from './ViewModel/AuthContext';

import Cartscreen from "./View/screens/Cartscreen";
import Dishdetailscreen from './View/screens/Dishdetailscreen';
import ForgotPasswordScreen from './View/screens/ForgotPasswordScreen';
import Home from './View/screens/Home';
import Onboarding from './View/screens/Onboarding';
import ProfileScreen from './View/screens/Profile';


const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();

//Navigate from the Login screen to screen of recover password.

function LoginStackNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen 
        name="Login" 
        component={Onboarding} 
        options={{ headerShown: false }} 
      />
      
      <LoginStack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen} 
      />
    </LoginStack.Navigator>
  );
}
//Navigate from the main screen (Home) to the details of the dish screen.
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeMain" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      
      <HomeStack.Screen 
        name="Dishdetailscreen" 
        component={Dishdetailscreen} 
      />
    </HomeStack.Navigator>
  );
}
// Main app menu (Located at the bottom of the screen)

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
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',   
        tabBarInactiveTintColor: 'gray',   
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Cart" component={Cartscreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginStackNavigator} />
    </Tab.Navigator>
    );
    }
 

export default function App() {

  const [fontsLoaded] = useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
    MarkaziText: require('./assets/fonts/MarkaziText-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </AuthProvider>
  );
}

 

   

 

