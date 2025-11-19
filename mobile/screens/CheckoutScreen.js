
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const { cartItems } = cart;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [transactionId, setTransactionId] = useState('');

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const placeOrderHandler = async () => {
    if (!name || !phone || !address) {
        Alert.alert('Missing Information', 'Please fill in all fields.');
        return;
    }
    if (paymentMethod !== 'COD' && !transactionId) {
        Alert.alert('Payment Info Missing', 'Please enter the transaction ID for your payment.');
        return;
    }

    try {
      const order = {
        orderItems: cartItems,
        customerInfo: { name, phone, address },
        paymentMethod,
        totalPrice: total,
        paymentConfirmation: paymentMethod !== 'COD' ? { transactionId } : undefined,
      };
      
      await api.orders.create(order); 
      
      Alert.alert('Order Placed!', 'Your order has been successfully placed.', [
        { text: 'OK', onPress: () => {
            clearCart();
            navigation.navigate('Home');
        }},
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while placing your order.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Shipping Address" value={address} onChangeText={setAddress} multiline />
      
      <Text style={styles.label}>Payment Method</Text>
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={[styles.paymentButton, paymentMethod === 'COD' && styles.selected]} onPress={() => setPaymentMethod('COD')}>
            <Text style={styles.paymentButtonText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paymentButton, paymentMethod === 'SyriatelCash' && styles.selected]} onPress={() => setPaymentMethod('SyriatelCash')}>
            <Text style={styles.paymentButtonText}>Syriatel Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.paymentButton, paymentMethod === 'MTNCash' && styles.selected]} onPress={() => setPaymentMethod('MTNCash')}>
            <Text style={styles.paymentButtonText}>MTN Cash</Text>
        </TouchableOpacity>
      </View>

      {paymentMethod !== 'COD' && (
        <TextInput
            style={styles.input}
            placeholder="Transaction ID"
            value={transactionId}
            onChangeText={setTransactionId}
        />
      )}

      <Text style={styles.summary}>Total: {total} SYP</Text>
      <Button title="Place Order" onPress={placeOrderHandler} />
    </View>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  paymentButtonText: {
    color: '#000',
  },
  summary: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 20,
  },
});

export default CheckoutScreen;
