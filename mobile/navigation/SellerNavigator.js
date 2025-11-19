import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerTabNavigator from './SellerTabNavigator';
import ProductFormScreen from '../screens/seller/ProductFormScreen';

const Stack = createNativeStackNavigator();

const SellerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SellerTabs" component={SellerTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: 'Manage Product' }} />
    </Stack.Navigator>
  );
};

export default SellerNavigator;