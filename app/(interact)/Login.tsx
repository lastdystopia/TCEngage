import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, TextInput, TouchableOpacity, View, ActivityIndicator  } from 'react-native';
import { Text } from '../../components/Themed';
import { PROTOCOL, BASE_URL, PORT } from '../../constants/Config';
import Form from './Form';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(false); 

  const handleLogin = () => {
    setLoading(true); 
    // Check if username is provided
    if (!username.trim()) {
      setLoading(false);
      alert('Please enter a username.');
      return;
    }
  
    // Check if password is provided
    if (!password.trim()) {
      setLoading(false);
      alert('Please enter a password.');
      return;
    }
  
    // Send request to the server for authentication
    fetch(`${PROTOCOL}://${BASE_URL}:${PORT}/login?username=${username}&password=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          setLoading(false);
          alert('User not found. Please create an account.');
          return; 
        } else if (response.status === 401) {
          // Incorrect password
          setLoading(false);
          alert('Incorrect password. Please try again.');
          return; 
        } else {
          // Other errors
          setLoading(false);
          alert('Error logging in. Please try again.');
          return; 
        }
      })
      .then(data => {
        console.log(data.message);
        alert('Login successful!');
        setIsLoggedIn(true);
      })
      .catch(error => {
        setLoading(false);
        alert('Error logging in. Please try again.');
      });
  };
  
  const createAccount = () => {
    console.log('Create new User Username:', newUsername);
    console.log('New User Password:', newPassword);
    // Check if username is too short or too long
  if (newUsername.length < 5 || newUsername.length > 100) {
    alert('Username length must be between 5 and 100 characters.');
    return;
  }
  
  // Check if password is too short or too long
  if (newPassword.length < 5 || newPassword.length > 100) {
    alert('Password length must be between 5 and 100 characters.');
    return;
  }
  fetch(PROTOCOL + "://" + BASE_URL+':'+PORT+'/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: newUsername, password: newPassword }),
  }) .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 409) {
      alert('Username already exists. Please try a different username.');
      return;// Promise.reject(new Error('Username already exists'));
    } else {
      alert('Error creating user. Please try again.');
      return; 
    }
  })
  .then(data => {
    console.log(data.message); // User created successfully
    alert("User created successfully!");
    setShowCreateAccount(false);
  })
  .catch(error => {
    alert("Error creating user. Please try again.");
  });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
     
      <View style={styles.overlay}>
        {!isLoggedIn && (
          <>
                  <Text style={styles.title}>Log in to engage!</Text>
          <Text>Login is simply for engagement security. User responses are not tracked.</Text>
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
                <Text style={styles.buttonText}>Log in</Text>
              </TouchableOpacity>

                {/* Conditional rendering of the spinny*/}
                {loading && <ActivityIndicator size="small" color="#0000ff" />} 

              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowCreateAccount(!showCreateAccount)}
              >
                <Text style={styles.toggleButtonText}>
                  {showCreateAccount ? 'Hide Create New Account' : 'Create New Account'}
                </Text>
              </TouchableOpacity>

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
          </>
        )}

        {isLoggedIn && <Form />}
      </View>
  </ScrollView>
)}

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
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom:20,
    marginTop:20
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
    marginBottom: 20
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
