import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, Alert, Animated, ActivityIndicator, SafeAreaView } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useContext, useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from '@react-native-material/core';
import BG_IMG from '../../assets/images/BG_IMG.jpg';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { API_URL } from '../../config';
import moment from 'moment/moment';

const ITEM_MARGIN = 20;
const ITEM_PADDING = 10;
const HEIGHT_IMG = 100;
const ITEM_RADIUS = 20;
const ITEM_SIZE = HEIGHT_IMG + ITEM_PADDING * 2 + ITEM_MARGIN;
const RightDrawerContent = (props) => {
    const [notifications, setNotifications] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { userInfo, userToken } = useContext(AuthContext);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    const getNotifications = () => {
        setIsLoading(true);
        fetch(`${API_URL}/notifications?user_id=${userInfo?.id}&order[createdAt]=desc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            },
        })
            .then(res => res.json())
            .then((result) => {
                setNotifications(result);
                setIsLoading(false)
            });
    };

    useEffect(() => {
        userInfo && getNotifications();
    }, [userInfo])


    const renderItem = ({ item, index }) => {
        const scale = scrollY.interpolate({
            inputRange: [
                -1, 0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
            ],
            outputRange: [1, 1, 1, 0],
        });
        const opacity = scrollY.interpolate({
            inputRange: [
                -1, 0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + .6),
            ],
            outputRange: [1, 1, 1, 0],
        });

        return (
            <ScrollView>
                <Animated.View style={[
                    styles.item,
                    { transform: [{ scale }], opacity }
                ]}>
                    <View style={styles.wrapText}>
                        <Text style={styles.fontNotification}>{item?.content}</Text>
                        <Text style={styles.fontDate}>{moment(item?.created_at).fromNow()}</Text>
                    </View>
                </Animated.View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView contentContainerStyle={styles.headerDrawer} keyboardDismissMode={true}>
                <Image
                    source={BG_IMG}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={70}
                />
                <ImageBackground style={styles.imgBC} >
                    <Ionicons style={styles.iconStyle} name='notifications-outline' size={40} />
                    <Text style={styles.textTitle}>Notifications</Text>
                </ImageBackground>
            </DrawerContentScrollView>
            <View style={styles.drawerItem}>
                <Animated.FlatList
                    data={notifications}
                    keyExtractor={item => `Key-${item.id}`}
                    renderItem={({ item, index }) => renderItem({ item, index })}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true },
                    )}
                />
            </View>
        </View>
    );
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
    iconStyle: {
        color: '#FFF',
        paddingVertical: 10,
        marginTop: -20,
    },
    textTitle: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    drawerItem: {
        flex: 1,
        backgroundColor: '#ECECEC',
        padding: 10,
    },
    fontNotification: {
        fontSize: 14,
        marginBottom: 10,
    },
    fontDate: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        marginBottom: ITEM_PADDING,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOffset: .3,
        shadowRadius: ITEM_RADIUS,
        padding: ITEM_PADDING,
    },
});
export default RightDrawerContent;
