
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SellerDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Dashboard</Text>
      <Text>Welcome, Seller! Here are your stats.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SellerDashboard;
