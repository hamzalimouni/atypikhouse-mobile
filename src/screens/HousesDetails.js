import { View, Text, Image, StyleSheet, SafeAreaView, ActivityIndicator, Animated, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';
import BG_IMG from '../../assets/images/BG_IMG.jpg';


const ITEM_MARGIN = 20;
const ITEM_PADDING = 10;
const HEIGHT_IMG = 100;
// height of one item
const ITEM_RADIUS = 20;
const ITEM_SIZE = HEIGHT_IMG + ITEM_PADDING * 2 + ITEM_MARGIN;
const HousesDetails = ({ route }) => {
    const { userToken } = useContext(AuthContext);
    const [reservation, setReservation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        getReservation();
    }, [route.params.paramKey]);

    const getReservation = () => {
        setIsLoading(true);
        fetch(`${API_URL}/reservations?house.id=${route.params.paramKey}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            }
        }).then((result) => result.json())
            .then((resultJson) => {
                setIsLoading(false);
                setReservation(resultJson["hydra:member"]);
            }).catch((e) => { console.log('error' + e) });
    };

    const scrollY = React.useRef(new Animated.Value(0)).current;

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
                    navigation.navigate('DeleteReservationScreen', {
                        paramKey: item,
                    })}>
                <Animated.View style={[
                    styles.item,
                    { transform: [{ scale }], opacity }
                ]}>
                    <View style={styles.info}>
                        <Text style={styles.wrapText}>{item?.id}</Text>
                        <Text style={styles.wrapText}>{`${item?.user?.firstname} ${item?.user?.lastname}`}</Text>
                    </View>
                    <View style={styles.infoDate}>
                        <Text>Arrivée: {moment(item?.fromDate).format('DD/MM/YYYY')}</Text>
                        <Text>Départ: {moment(item?.toDate).format('DD/MM/YYYY')}</Text>
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
                        data={reservation}
                        keyExtractor={item => `Key-${item.id}`}
                        renderItem={({ item, index }) => renderItem({ item, index })}
                        // contentContainerStyle={{ padding: 20 }}
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
    wrapText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        marginBottom: ITEM_MARGIN,
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOffset: .3,
        shadowRadius: ITEM_RADIUS,
        paddingVertical: ITEM_MARGIN,
        paddingHorizontal: ITEM_MARGIN,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: ITEM_MARGIN,
    },
    infoDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
});
export default HousesDetails;





