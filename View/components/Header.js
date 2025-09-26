import { useNavigation } from '@react-navigation/native';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Header() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const goToProfile = () => navigation.navigate('profile');

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top }]}>
    
      <Image
        source={require('./assets/images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel="Little Lemon"
      />

      
      <Pressable
        onPress={goToProfile}
        style={styles.avatarButton}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Abrir perfil"
      >
        <Image
          source={{ require: './assets/images/Profile.png' }}
          style={styles.avatar}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E6E6E6',
  },
  logo: {
    height: 28,
    width: '50%', 
  },
  avatarButton: {
    position: 'absolute',
    right: 16,
    top: Platform.select({ ios: 8, android: 8 }),
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});