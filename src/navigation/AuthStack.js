import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AuthStack;