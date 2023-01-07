import { View, Text, Dimensions, SafeAreaView, StyleSheet, Image, Pressable, Animated, TouchableWithoutFeedback, Easing, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileInput from '../components/ProfileInput';
// import Textarea from 'react-native-textarea';
import { AuthContext } from '../context/AuthContext';
import { API_URL, MEDIA_URL } from '../../config';
import moment from 'moment/moment';
import CustomButton from '../components/CustomButton';
import BG_IMG from '../../assets/images/BG_IMG.jpg';

// import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';


// const images = [
//     'https://images.unsplash.com/photo-1653254310464-2c2f0ef5649e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
//     'https://images.unsplash.com/photo-1636312588910-faad77c4c150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
//     'https://images.unsplash.com/photo-1636312589063-0ba99db76d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// ];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const DeleteReservation = ({ route }) => {
    const { userInfo, userToken } = useContext(AuthContext);
    const [reservation, setReservation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [imgActive, setImgActive] = useState(0);
    const [show, setShow] = useState(false);
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

    // const handleOpen = () => {
    //     setShow(true);
    // };

    // const handleClose = () => {
    //     setShow(false);
    // };

    const annulerReservation = () => {
        setIsLoading(true);
        fetch(API_URL + '/reservations/' + route.params.paramKey.id, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Authorization': 'bearer ' + userToken,
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify({ status: 'CANCELED' })
        })
            .then(res => res.json())
            .then((result) => {
                setIsLoading(false);
                if (result.status == 'CANCELED') {
                    alert('Réservation annulée avec succès');
                } else {
                    alert('Impossible d\'annuler la réservation');
                }
            })

    };

    const customAlert = () => {
        Alert.alert('Attention', 'Vous voulez annuler cette reservation ?',
            [
                {
                    text: 'Oui',
                    onPress: () => { annulerReservation(); }
                },
                {
                    text: 'Non',
                },
            ]
        );
    };

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
                    <ProfileInput inputTitle="Départ" placeHolder="départ" value={moment(reservation?.fromDate).format('DD/MM/YYYY')} />
                    <ProfileInput inputTitle="Arrivée" placeHolder="arrivée" value={moment(reservation?.toDate).format('DD/MM/YYYY')} />
                    <ProfileInput inputTitle="Prix" placeHolder="prix" value={reservation?.amount + ' €'} />
                </View>
                <View>
                    <ProfileInput inputTitle="Nom complète" placeHolder="nom complète" value={`${reservation?.user?.firstname} ${reservation?.user?.lastname}`} />
                    <ProfileInput inputTitle="Email" placeHolder="email" value={reservation?.user?.email} />
                    <ProfileInput inputTitle="Téléphone" placeHolder="téléphone" value={reservation?.user?.number} />
                </View>
                <View style={styles.BtnAnnuler}>
                    <Text style={styles.titleAnnuler}>Annuler la reservation</Text>
                    <CustomButton text="Annuler" onPress={() => customAlert()} type="DANGER" />
                    {/* <SCLAlert
                        theme="info"
                        show={show}
                        title="Lorem"
                        subtitle="Lorem ipsum dolor"
                    >
                        <SCLAlertButton theme="info" onPress={customAlert()}>Done</SCLAlertButton>
                    </SCLAlert> */}
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
        marginTop: 15,
    },
    BtnAnnuler: {
        marginTop: 10,
    },
    titleAnnuler: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default DeleteReservation