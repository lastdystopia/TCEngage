import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '../../components/Themed';
import bcrypt from 'react-native-bcrypt'; 
import EditScreenInfo from '../../components/EditScreenInfo';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    // TODO - implement login logic
  };

  const createAccount = () => {
    console.log('Create new User Username:', newUsername);
    console.log('New User Password:', newPassword);
    // TODO - implement account creation logic
  };
// Function to hash password
// hashing is one way, don't "unhash", hash password a second time when comparing it to database 
const hashPassword = (password: string) => {
  const saltRounds = 10; // Number of "salt rounds"
  const salt = bcrypt.genSaltSync(saltRounds); // Generate a salt
  return bcrypt.hashSync(password, salt); // Hash the password with the generated salt
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Ferguson_Center_Outside.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Theater CNU Engage!</Text>
                    <EditScreenInfo path="app/(tabs)/index.tsx" />

          <Text style={styles.title2}>Log into your account:</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Toggle button for showing/hiding create account section */}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setShowCreateAccount(!showCreateAccount)}>
              <Text style={styles.toggleButtonText}>
                {showCreateAccount ? 'Hide Create New Account' : 'Create New Account'}
              </Text>
            </TouchableOpacity>

            {/* Create account form */}
            {showCreateAccount && (
              <View style={styles.createNewAccount}>
                <TextInput
                  style={styles.input}
                  placeholder="New Username"
                  value={newUsername}
                  onChangeText={setNewUsername}
                />
                <TextInput
                  style={styles.input}
                  placeholder="New User Password"
                  secureTextEntry={true}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity style={styles.button} onPress={createAccount}>
                  <Text style={styles.buttonText}>Create New Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  title2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2e86de',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 20,
  },
  toggleButtonText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  createNewAccount: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
