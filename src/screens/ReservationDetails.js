import { View, Text, Dimensions, SafeAreaView, StyleSheet, Image, Pressable, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileInput from '../components/ProfileInput';
// import Textarea from 'react-native-textarea';
import RNTextArea from "@freakycoder/react-native-text-area";
import StarRate from '../components/StarRate';
import { AuthContext } from '../context/AuthContext';
import { API_URL, MEDIA_URL } from '../../config';
import moment from 'moment/moment';
import BG_IMG from '../../assets/images/BG_IMG.jpg';


// const images = [
//     'https://images.unsplash.com/photo-1653254310464-2c2f0ef5649e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     'https://images.unsplash.com/photo-1636312588910-faad77c4c150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     'https://images.unsplash.com/photo-1636312589063-0ba99db76d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// ];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const numStars = 5;

const ReservationDetails = ({ route }) => {
    const { userInfo, userToken } = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [reservation, setReservation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imgActive, setImgActive] = useState(0);
    useEffect(() => {
        setReservation(route.params.paramKey);
    }, [route.params.paramKey]);

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if (slide != imgActive) {
                setImgActive(slide);
            }
        }
    };
    let stars = [];
    const [rating, setRating] = useState([]);
    const rate = (star) => {
        setRating(star);
    };

    const [animation, setAnimation] = useState(new Animated.Value(1));
    const animate = () => {
        Animated.timing(animation, {
            toValue: 2,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setAnimation(1);
        });
    };

    // const animateScale = animation.interpolate({
    //     inputRange: [1, 1.5, 2],
    //     outputRange: [1, 1.4, 1],
    // });

    // const animationStyle = {
    //     transform: [{
    //         scale: animateScale,
    //     }]
    // };

    for (let i = 0; i < numStars; i++) {
        stars.push(
            <TouchableWithoutFeedback
                key={i}
                onPress={() => { rate(i) }}
            >
                <Animated.View>
                    {/* <Animated.View style={i <= rating ? animationStyle : ""}> */}
                    <StarRate filled={i <= rating ? true : false} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    };

    const InsertComment = () => {
        setIsLoading(true);
        fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            },
            body: JSON.stringify({
                grade: rating + 1,
                comment: comment,
                user: {
                    id: 4,
                },
                house: {
                    id: 12,
                },
            }),
        }).then(
            (result) => {
                setIsLoading(false);
                if (result.status == 201) {
                    alert('Commmentaire ajoutée avec succès');
                }
                else {
                    alert('Impossible d\'ajoutée le commentaire, veuillez ressayer plus tard');
                }
            }
        );
    };

    // const getReservation = () => {
    //     setIsLoading(true);
    //     fetch(`${API_URL}/reservations/${route.params.paramKey}`, {
    //         method: 'GET',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'bearer ' + userToken,
    //         }
    //     }).then((result) => result.json())
    //         .then((resultJson) => {
    //             setIsLoading(false);
    //             setReservation(resultJson);
    //         });
    // };

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={BG_IMG}
                style={StyleSheet.absoluteFillObject}
                blurRadius={70}
            />
            <View style={styles.wrap}>
                <ScrollView
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrap}
                >
                    {
                        reservation?.house?.images?.map((e, index) =>
                            <Image
                                key={e}
                                resizeMode='stretch'
                                style={styles.wrap}
                                source={{ uri: MEDIA_URL + e?.fileName }}
                            />
                        )
                    }
                </ScrollView>
                <View style={styles.wrapDot}>
                    {
                        reservation?.house?.images?.map((e, index) =>
                            <Text
                                key={e}
                                style={imgActive == index ? styles.dotActive : styles.dotInactive}
                            >●</Text>
                        )
                    }
                </View>
            </View>
            <View style={styles.contentWrap}>
                <Text style={styles.titleHouse}>{reservation?.house?.title}</Text>
                <View style={styles.dateWrap}>
                    <ProfileInput inputTitle="Arrivée" placeHolder="arrivée" value={moment(reservation?.fromDate).format('DD/MM/YYYY')} />
                    <ProfileInput inputTitle="Départ" placeHolder="départ" value={moment(reservation?.toDate).format('DD/MM/YYYY')} />
                    <ProfileInput inputTitle="Prix" placeHolder="prix" value={reservation?.amount + ' €'} />
                </View>
                <View>
                    <RNTextArea
                        maxCharLimit={400}
                        placeholderTextColor="black"
                        exceedCharCountColor="#990606"
                        placeholder={"Write your review..."}
                        onChangeText={setComment}
                        value={comment}
                        textAlignVertical='top'
                    />
                    <View style={styles.reviewWrap}>
                        <View style={{ flexDirection: 'row' }}>{stars}</View>
                        <Pressable onPress={() => { InsertComment() }} style={styles.reviewBtn}>
                            <Text style={styles.reviexText}>Envoyer</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dotActive: {
        margin: 3,
        color: 'black',
    },
    dotInactive: {
        margin: 3,
        color: 'white',
    },
    contentWrap: {
        marginTop: 20,
        paddingHorizontal: 30,
    },
    titleHouse: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    dateWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    textAreaWrap: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 20,
    },
    reviewWrap: {
        flexDirection: 'row',
        marginTop: 25,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewBtn: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3B71F3',
    },
    reviexText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default ReservationDetails;