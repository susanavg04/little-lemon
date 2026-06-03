import React, { useContext } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../ViewModel/AuthContext';


export default function Header() {
  const insets = useSafeAreaInsets();
  const { user } = useContext(AuthContext);
 
  return (
    <View style={[styles.wrapper, { paddingTop: insets.top  }]}>
    <View style={styles.sideContainer} />
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
        accessible
        accessibilityLabel="Little Lemon"
      />
      
       <View style={styles.sideContainer}>
        <Pressable onPress={goToProfile} style={styles.avatarButton}>
          {user?.imagenUri ? (
          <Image source={{ uri: user.imagenUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{user?.iniciales || "?"}</Text>
          </View>
        )}
        </Pressable>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEFEE',
  },
  logo: {
    height: 80,
    width: 220,
    flex: 1,  
  },
  avatarButton: {
   justifyContent: 'center',
  },
 
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#CBD2D9'
  },
  sideContainer: {
    width: 50, 
    alignItems: 'flex-end',
  },
  avatarPlaceholder: {
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});