import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import StoriesScreen from '../screens/StoriesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Text } from 'react-native';
import { useCart } from '../context/CartContext';
// ...
      <Tab.Screen name="Cart" component={CartScreen} // ...
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
    </Tab.Navigator>
// ...  );
};

export default TabNavigator;
