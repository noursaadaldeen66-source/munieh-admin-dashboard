import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [stories, setStories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
//...
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.imageUrl.replace('localhost', '10.0.2.2') }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} SYP</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => { addToCart(item, 1); alert('Added to cart!'); }}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStoryItem = ({ item }) => (
//...
  productPrice: {
    fontSize: 14,
    color: '#28a745',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  storyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  storyTextContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyContent: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
});

export default HomeScreen;
