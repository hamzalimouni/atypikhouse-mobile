import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@react-native-material/core';
import BG_IMG from '../../assets/images/BG_IMG.jpg';
// import Share from 'react-native-share';

const CustomDrawer = (props) => {
    const { logout, userInfo } = useContext(AuthContext);
    // const myCustomShare = async () => {
    //     const shareOptions = {
    //         message: 'this is a test message ',
    //     }
    //     try {
    //         shareResponse = await Share.open(shareOptions);
    //     } catch (error) {
    //         console.log('Error => ', error);
    //     }
    // };
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
                <TouchableOpacity onPress={() => { myCustomShare }} style={{ paddingVertical: 15 }}>
                    <View style={styles.share}>
                        <Ionicons name='share-social-outline' size={22} />
                        <Text style={styles.shareText}>Partager</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { customAlert() }} style={{ paddingVertical: 15 }}>
                    <View style={styles.share}>
                        <Ionicons name='exit-outline' size={22} />
                        <Text style={styles.shareText}>Deconnexion</Text>
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
    share: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
export default CustomDrawer;