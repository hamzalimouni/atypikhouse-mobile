import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import ProfileInput from '../components/ProfileInput';
import { AuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import { Avatar } from '@react-native-material/core';
import moment from 'moment/moment';
import BG_IMG from '../../assets/images/BG_IMG.jpg';


const ProfileScreen = () => {
    const { userInfo } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Image
                source={BG_IMG}
                style={StyleSheet.absoluteFillObject}
                blurRadius={70}
            />
            <ScrollView>
                <View style={styles.header}></View>
                <View style={styles.itemCenter}>
                    {/* <Image source={Profile} style={styles.img} /> */}
                    <Avatar style={styles.img} size={120} autoColor={true} label={`${userInfo?.firstname} ${userInfo?.lastname}`} />
                    <Text style={styles.textUserName}>{`${userInfo?.firstname} ${userInfo?.lastname}`}</Text>
                </View>
                <View style={{ padding: 20 }}>
                    <ProfileInput inputTitle="Email" placeHolder="email" value={userInfo?.email} />
                    <ProfileInput inputTitle="Téléphone" placeHolder="téléphone" value={userInfo?.number} />
                    <ProfileInput inputTitle="Date" placeHolder="date de naissance" value={moment(userInfo?.birthday).format('DD/MM/YYYY')} />
                    <ProfileInput inputTitle="Adresse" placeHolder="adresse" value={userInfo?.address?.address} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        // backgroundColor: '#00820B',
        height: 140,
    },
    itemCenter: {
        alignItems: 'center',
        marginBottom: 30,
    },
    img: {
        marginBottom: 20,
        marginTop: -70,
    },
    textUserName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
export default ProfileScreen;