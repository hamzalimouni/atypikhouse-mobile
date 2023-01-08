import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@react-native-material/core';
import BG_IMG from '../../assets/images/BG_IMG.jpg';

const CustomDrawer = (props) => {
    const { logout, userInfo } = useContext(AuthContext);
    const customAlert = () => {
        Alert.alert('Attention', 'Vous voulez déconnectée ?',
            [
                {
                    text: 'Oui',
                    onPress: () => { logout(); }
                },
                {
                    text: 'Non',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={styles.headerDrawer} keyboardDismissMode={true}>
                <Image
                    source={BG_IMG}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={70}
                />
                <ImageBackground style={styles.imgBC} >
                    <Avatar style={styles.img} size={80} autoColor={true} label={`${userInfo?.firstname} ${userInfo?.lastname}`} />
                    <Text style={styles.textUserName}>{`${userInfo?.firstname} ${userInfo?.lastname}`}</Text>
                </ImageBackground>
                <View style={styles.drawerItem}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.footerWrapper}>
                <TouchableOpacity onPress={() => { customAlert() }} style={{ paddingVertical: 15 }}>
                    <View style={styles.logout}>
                        <Ionicons name='exit-outline' size={22} />
                        <Text style={styles.logoutText}>Deconnexion</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerDrawer: {
        backgroundColor: '#51a191',
    },
    imgBC: {
        padding: 20,
    },
    img: {
        marginBottom: 10,
    },
    textUserName: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItem: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 20,
    },
    footerWrapper: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#CCC',
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
export default CustomDrawer;