import { useNavigation } from '@react-navigation/native';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header({imagenUri, iniciales}) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const goTonboarding = () => navigation.navigate('Onboarding');

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 5 }]}>
    
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel="Little Lemon"
      />
      {<Pressable onPress={goTonboarding} style={styles.avatarButton}>
        {imagenUri ? (
            <Image source={{ uri: imagenUri }} style={styles.avatar} />
         ) : (
      <View style={[styles.avatar, { backgroundColor: '#495E57', justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{iniciales}</Text>
      </View>
    )}
    </Pressable>
    }
     
  
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEFEE',
  },
  logo: {
    height: 80,
    width: '150%', 
  },
  avatarButton: {
    position: 'absolute',
    right: 16,
    top: Platform.select({ ios: 8, android: 8 }),
    bottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CBD2D9'
  },
});