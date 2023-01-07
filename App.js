import React from 'react';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
