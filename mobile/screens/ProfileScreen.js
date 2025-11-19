
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <>
            <Text style={styles.info}>Name: {user.name}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            <Text style={styles.info}>Role: {user.role}</Text>
        </>
      )}
      
      {user && user.role === 'buyer' && (
        <View style={styles.upgradeButton}>
            <Button 
                title="Become a Seller" 
                onPress={() => navigation.navigate('UpgradeRequest')} 
            />
        </View>
      )}

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={logout} color="#dc3545" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  upgradeButton: {
      marginTop: 20,
      width: '80%',
  },
  logoutButton: {
      marginTop: 20,
      width: '80%',
  }
});

export default ProfileScreen;
