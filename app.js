import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Cartscreen from "./View/screens/Cartscreen";
import Home from './View/screens/Home';
import Onboarding from "./View/screens/Onboarding";
import Profile from './View/screens/Profile';
import Splashscreen from './View/screens/Splashscreen';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function App() {
    const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });
    const [fontsLoaded] = useFonts({
    Karla: require('./assets/fonts/Karla-Regular.ttf'),
    MarkaziText: require('./assets/fonts/MarkaziText-Regular.ttf'),
  });

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('Onboarding_completed', 'true');
      setState(prev => ({ ...prev, isOnboardingCompleted: true }));
    } catch (e) {
      console.error(e);
    }
  };


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
          }

          // Retornamos el componente del icono
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',   // Color cuando está seleccionado
        tabBarInactiveTintColor: 'gray',   // Color cuando no está seleccionado
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cartscreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

    useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('Onboarding_completed');
        setState({
          isLoading: false,
          isOnboardingCompleted: value === 'true', 
        });
      } catch (e) {
        console.error('Error reading Onboarding status', e);
        setState({ isLoading: false, isOnboardingCompleted: false });
      }
    };

    checkOnboardingStatus();
  }, []);

  if (state.isLoading) {
    return <Splashscreen />; 
  }
   
  
     return (
    <SafeAreaProvider>
      <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown:false}}>
         { state.isOnboardingCompleted === false ? (
          <Stack.Screen name="Onboarding">
              {props => (
                <Onboarding {...props} onFinish={completeOnboarding} />
              )}
            </Stack.Screen>
           ):(
           <Stack.Screen name="MainTabs" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
   </SafeAreaProvider>
    
   
  );

}

export default App;