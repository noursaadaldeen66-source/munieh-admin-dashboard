
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { api } from '../../services/api';

const ProductFormScreen = ({ navigation, route }) => {
  const productToEdit = route.params?.product;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('agricultural'); // or 'handicraft'
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString());
      setStock(productToEdit.stock.toString());
      setCategory(productToEdit.category);
      setImageUrl(productToEdit.imageUrl);
    }
  }, [productToEdit]);

  const handleSave = async () => {
    const productData = { 
        name, 
        description, 
        price: parseFloat(price), 
        stock: parseInt(stock, 10), 
        category, 
        imageUrl 
    };

    try {
      if (productToEdit) {
        await api.products.update(productToEdit._id, productData);
      } else {
        await api.products.create(productData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save product:', error);
      Alert.alert('Error', 'Failed to save product.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{productToEdit ? 'Edit Product' : 'Add New Product'}</Text>
      <TextInput style={styles.input} placeholder="Product Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Stock Quantity" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} />
      {/* A picker would be better for category, but using text input for simplicity */}
      <TextInput style={styles.input} placeholder="Category (agricultural/handicraft)" value={category} onChangeText={setCategory} />
      <Button title="Save Product" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
});

export default ProductFormScreen;
