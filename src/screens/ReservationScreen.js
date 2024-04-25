import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Animated, Pressable } from "react-native";
import { API_URL, MEDIA_URL } from "../../config";
import { AuthContext } from "../context/AuthContext";
import BG_IMG from '../../assets/images/BG_IMG.jpg';

const ITEM_MARGIN = 20;
const ITEM_PADDING = 10;
const HEIGHT_IMG = 100;
const ITEM_RADIUS = 20;
const ITEM_SIZE = HEIGHT_IMG + ITEM_PADDING * 2 + ITEM_MARGIN;
const ReservationScreen = () => {
    const navigation = useNavigation();
    const { userInfo, userToken } = useContext(AuthContext);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        userInfo && getReservation();
    }, [userInfo])

    const getReservation = () => {
        setIsLoading(true);
        fetch(`${API_URL}/reservations?user.id=${userInfo?.id}&order[createdAt]=desc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            },
        })
            .then(res => res.json())
            .then((result) => {
                setReservations(result["hydra:member"]);
                setIsLoading(false)
            });
    };

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
            <Pressable
                onPress={() =>
                    navigation.navigate('ReservationDetailsScreen', {
                        paramKey: item,
                    })}>
                <Animated.View style={[
                    styles.item,
                    { transform: [{ scale }], opacity }
                ]}>
                    <Image
                        style={styles.image}
                        source={{ uri: MEDIA_URL + item?.house?.images[0]?.fileName }}
                        resizeMode='contain'
                    />
                    <View style={styles.wrapText}>
                        <Text style={styles.fontSize}>{item?.house?.title}</Text>
                    </View>
                </Animated.View>
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={BG_IMG}
                style={StyleSheet.absoluteFillObject}
                blurRadius={70}
            />
            <View style={styles.wrapper}>
                {isLoading ? <ActivityIndicator /> : (
                    <Animated.FlatList
                        data={reservations}
                        keyExtractor={item => `Key-${item.id}`}
                        renderItem={({ item, index }) => renderItem({ item, index })}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: true },
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: ITEM_MARGIN,
    },
    fontSize: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: HEIGHT_IMG,
        borderRadius: ITEM_RADIUS,
    },
    wrapText: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        marginBottom: ITEM_MARGIN,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOffset: .3,
        shadowRadius: ITEM_RADIUS,
        padding: ITEM_PADDING,
    },
});
export default ReservationScreen;