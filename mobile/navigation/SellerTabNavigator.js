
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellerDashboard from '../screens/seller/SellerDashboard';
import MyProductsScreen from '../screens/seller/MyProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const SellerTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="SellerDashboard" component={SellerDashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="MyProducts" component={MyProductsScreen} options={{ title: 'My Products' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default SellerTabNavigator;
