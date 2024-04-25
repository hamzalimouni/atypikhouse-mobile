import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReservationDetails from '../screens/ReservationDetails';
import HousesScreen from '../screens/HousesScreen';
import HousesDetails from '../screens/HousesDetails';
import DeleteReservation from '../screens/DeleteReservation';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import RightDrawerContent from '../components/RightDrawerContent';

const RightDrawer = createDrawerNavigator();
const LeftDrawer = createDrawerNavigator();

const AppStack = () => {
    const navigation = useNavigation();

    function LeftDrawerScreen(props) {
        return (
            <LeftDrawer.Navigator
                id="LeftDrawer"
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    drawerLabelStyle: { marginLeft: -20, fontSize: 15, fontWeight: 'bold' },
                    drawerActiveBackgroundColor: '#51a191',
                    drawerActiveTintColor: '#FFF',
                    drawerInactiveTintColor: '#333',
                    drawerPosition: 'left',
                    keyboardDismissMode: 'on-drag',
                }}>
                <LeftDrawer.Screen
                    name='ReservationScreen'
                    component={ReservationScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="cart-outline" size={25} color={color} />
                        ),
                        headerTitle: "Mes réservations",
                        title: 'Reservation',
                        headerRight: () => <Ionicons onPress={() => { props.navigation.openDrawer() }} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                    }}
                />
                <LeftDrawer.Screen
                    name='Houses'
                    component={HousesScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={25} color={color} />
                        ),
                        headerTitle: "My houses",
                        title: 'Houses',
                        headerRight: () => <Ionicons onPress={() => { props.navigation.openDrawer() }} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                    }}
                />
                <LeftDrawer.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={25} color={color} />
                        ),
                        headerTitle: "Profile",
                        title: 'Profile',
                        headerRight: () => <Ionicons onPress={() => { props.navigation.openDrawer() }} name="notifications-outline" style={{ marginRight: 15 }} size={31} />,
                    }}
                />
                <LeftDrawer.Screen
                    name='HousesDetailsScreen'
                    component={HousesDetails}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        headerTitle: "House réservations",
                        headerLeft: () => <Pressable onPress={() => { navigation.navigate('Houses') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                    }}
                />
                <LeftDrawer.Screen
                    name='DeleteReservationScreen'
                    component={DeleteReservation}
                    options={{
                        headerTitle: "Annuler réservation",
                        drawerItemStyle: {
                            display: 'none',
                        },
                        drawerIcon: false,
                        headerLeftLabelVisible: false,
                        headerLeft: () => <Pressable onPress={() => { navigation.navigate('Houses') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                    }}
                />
                <LeftDrawer.Screen
                    name='ReservationDetailsScreen'
                    component={ReservationDetails}
                    options={{
                        drawerItemStyle: {
                            display: 'none',
                        },
                        headerTitle: "Commenter ",
                        headerLeft: () => <Pressable onPress={() => { navigation.navigate('ReservationScreen') }}><Ionicons name="arrow-back-outline" style={{ marginLeft: 10 }} size={31} /></Pressable>,
                    }}
                />
            </LeftDrawer.Navigator>
        );
    }

    return (
        <RightDrawer.Navigator
            id="RightDrawer"
            drawerContent={() => <RightDrawerContent />}
            screenOptions={{
                drawerLabelStyle: { fontSize: 15, fontWeight: 'bold' },
                drawerActiveBackgroundColor: '#51a191',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#333',
                drawerPosition: 'right',
                keyboardDismissMode: 'on-drag',
                headerShown: false
            }}
        >
            <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
        </RightDrawer.Navigator >
    )
}

export default AppStack;
