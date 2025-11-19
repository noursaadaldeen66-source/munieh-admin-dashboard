
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { api } from '../../services/api';

const UpgradeRequestScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await api.upgradeRequests.create({ message });
      Alert.alert(
        'Request Sent',
        'Your request to become a seller has been sent. You will be notified once it is reviewed.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'Failed to send request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Become a Seller</Text>
      <Text style={styles.subtitle}>
        Tell us a bit about yourself and what you plan to sell. Your request will be reviewed by an admin.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Your message (optional)"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit Request" onPress={handleSubmit} />
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});

export default UpgradeRequestScreen;
