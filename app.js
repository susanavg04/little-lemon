import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Cartscreen from "./View/screens/Cartscreen";
import Dishdetailscreen from "./View/screens/Dishdetailscreen";
import Home from './View/screens/Home';
import Onboarding from "./View/screens/Onboarding";
import Profile from './View/screens/Profile';
import Splashscreen from './View/screens/splashscreen';



const Stack = createNativeStackNavigator();


function App() {
    const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

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

     return (
    <SafeAreaProvider>
      <NavigationContainer>
       <Stack.Navigator screenOptions={{headerShown:false}}>
         {state.isLoading? (
          <Stack.Screen name="Splashscreen" component={Splashscreen} />
          ): state.isOnboardingCompleted ? (
          <>
          <Stack.Screen name="Home" component={Home} /> 
          <Stack.Screen name="DishDetail" component={Dishdetailscreen} />
          <Stack.Screen name="Cart" component={Cartscreen} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      ):(
       <>
        <Stack.Screen name="Onboarding" component={Onboarding} /> 
       </>
   )};
        </Stack.Navigator>
      </NavigationContainer>
   </SafeAreaProvider>
    
   
  );

}

export default App;