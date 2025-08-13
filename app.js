import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import onboarding from './screens/onboarding';
import profile from './screens/profile';



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
    
    if (state.isLoading) {
     
      return <splashscreen />;
      }
     return (
    <NavigationContainer>
    
      <Stack.Navigator>
           {state.isOnboardingCompleted ? (
     
     <Stack.Screen name="Profile" component={profile} />
   ) : (
     
     <Stack.Screen name="Onboarding" component={onboarding} />
   )}
      </Stack.Navigator>

</NavigationContainer>
   
  );

}

export default App;