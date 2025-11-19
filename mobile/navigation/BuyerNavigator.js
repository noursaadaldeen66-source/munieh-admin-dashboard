
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuyerTabNavigator from './BuyerTabNavigator';
import CheckoutScreen from '../screens/CheckoutScreen';
import UpgradeRequestScreen from '../screens/UpgradeRequestScreen';

const Stack = createNativeStackNavigator();

const BuyerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={BuyerTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="UpgradeRequest" component={UpgradeRequestScreen} options={{ title: 'Become a Seller' }} />
    </Stack.Navigator>
  );
};

export default BuyerNavigator;
