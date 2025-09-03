import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import home from './screens/home';
import onboarding from './screens/onboarding';
import profile from './screens/profile';
import splashscreen from './screens/splashscreen';


const Stack = createNativeStackNavigator();

function App() {
    const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });

    useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('onboarding_completed');
        setState({
          isLoading: false,
          isOnboardingCompleted: value === 'true', 
        });
      } catch (e) {
        console.error('Error reading onboarding status', e);
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
        <Stack.Screen name="splashscreen" component={splashscreen} />
      ):(
      <>
     {state.isOnboardingCompleted ? (
      <Stack.Screen name="Home" component={home} /> 
      ):(
      <>
     <Stack.Screen name="Profile" component={profile} />
     <Stack.Screen name="Onboarding" component={onboarding} /> 
      </>
   )};
   </>
  )};
   </Stack.Navigator>
   </NavigationContainer>
   </SafeAreaProvider>
    
   
  );

}

export default App;