import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>150 x 150</Text>
        </View>
      </View>
      <Text style={styles.username}>Nome do Usuário</Text>
      <Text style={styles.email}>usuario@exemplo.com</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginVertical: 16,
  },
  avatarContainer: {
    marginVertical: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00bcd4',
    borderWidth: 2,
  },
  avatarText: {
    color: '#888',
    fontSize: 14,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginTop: 8,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
  },
  button: {
    width: '80%',
    paddingVertical: 12,
    backgroundColor: '#00bcd4',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
