import React, { useContext, useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationDetails from '../screens/ReservationDetails';
import HousesScreen from '../screens/HousesScreen';
import { AuthContext } from '../context/AuthContext';
import { API_URL, BG_IMG } from '../../config';
import HousesDetails from '../screens/HousesDetails';
import DeleteReservation from '../screens/DeleteReservation';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Keyboard, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NotificationScreen from '../screens/NotificationScreen';

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
    const { userInfo, userToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [annonce, setAnnonce] = useState(null);
    const navigation = useNavigation();

    const getAnnonces = () => {
        setIsLoading(true);
        fetch(`${API_URL}/houses?owner.id=${userInfo?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            }
        }).then((result) => result.json())
            .then((resultJson) => {
                setIsLoading(false);
                setAnnonce(resultJson);
            });
    };

    useEffect(() => {
        getAnnonces();
    }, [])

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { marginLeft: -20, fontSize: 15, fontWeight: 'bold' },
                drawerActiveBackgroundColor: '#51a191',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#333',
                drawerPosition: 'left',
                keyboardDismissMode: 'on-drag',
            }}
        >
            <Drawer.Screen
                name='ReservationScreen'
                component={ReservationScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="cart-outline" size={25} color={color} />
                    ),
                    headerTitle: "Mes reservation",
                    title: 'Reservation',
                    headerRight: () => <Ionicons onPress={() => { }} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                }}
            />
            {/* {annonce !== null
                ?
                <Drawer.Screen
                    name='Houses'
                    component={HousesScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home-outile" size={25} color={color} />
                        ),
                        headerTitle: "My houses",
                        title: 'Houses'
                    }}
                />
                :
                <Drawer.Screen
                    name='Houses'
                    component={HousesScreen}
                    options={{
                        drawerItemStyle: {
                        display: 'none',
                    },
                    }}
                />
            } */}
            <Drawer.Screen
                name='Houses'
                component={HousesScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={25} color={color} />
                    ),
                    headerTitle: "My houses",
                    title: 'Houses',
                    headerRight: () => <Ionicons onPress={() => alert('ok')} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                }}
            />
            <Drawer.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="person-outline" size={25} color={color} />
                    ),
                    headerTitle: "Profile",
                    title: 'Profile',
                    headerRight: () => <Ionicons onPress={() => alert('ok')} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                }}
            />
            <Drawer.Screen
                name='HousesDetailsScreen'
                component={HousesDetails}
                options={{
                    drawerItemStyle: {
                        display: 'none',
                    },
                    headerTitle: "House reservations",
                    headerLeft: () => <Pressable onPress={() => { navigation.navigate('Houses') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                }}
            />
            <Drawer.Screen
                name='DeleteReservationScreen'
                component={DeleteReservation}
                options={{
                    headerTitle: "Delete reservations",
                    drawerItemStyle: {
                        display: 'none',
                    },
                    drawerIcon: false,
                    headerLeftLabelVisible: false,
                    headerLeft: () => <Pressable onPress={() => { navigation.navigate('Houses') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                }}
            />
            <Drawer.Screen
                name='ReservationDetailsScreen'
                component={ReservationDetails}
                options={{
                    drawerItemStyle: {
                        display: 'none',
                    },
                    headerTitle: "Informations du reservation",
                    headerLeft: () => <Pressable onPress={() => { navigation.navigate('ReservationScreen') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                }}
            />
        </Drawer.Navigator >
    )
}

export default AppStack;
