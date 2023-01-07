import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const AppNav = () => {
    const { isLoading, userToken } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    return (
        <NavigationContainer>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default AppNav;