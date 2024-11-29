import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/autenticacao/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          senha: password
        })
      });

      // Verifica o status da resposta
      if (response.status === 404) {
        window.alert('ERRO: Usuário não cadastrado!');
        return
      } else if (response.status === 406) {
        window.alert('ERRO: Preencha todos os campos!');
        return
      } else if (response.status === 403) {
        window.alert('ERRO: Senha incorreta!');
        return
      } else if (response.status === 200) {
        storeData(email)
        navigation.navigate('Home');
      } else if (response.status === 500) {
        window.alert('ERRO: Ocorreu um erro inesperado');
        return
      } else {
        window.alert('ERRO: Resposta desconhecida do servidor');
        return
      }
    } catch (error) {
      window.alert('ERRO: Não foi possível conectar ao servidor');
      return
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('email', value);
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00bcd4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerText: {
    fontSize: 16,
    color: '#00bcd4',
  },
});

export default LoginScreen;
