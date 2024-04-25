import { View, Text, Dimensions, SafeAreaView, StyleSheet, Image, Animated, Easing, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileInput from '../components/ProfileInput';
import { AuthContext } from '../context/AuthContext';
import { API_URL, MEDIA_URL } from '../../config';
import moment from 'moment/moment';
import CustomButton from '../components/CustomButton';
import BG_IMG from '../../assets/images/BG_IMG.jpg';
// import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const DeleteReservation = ({ route }) => {
    const { userToken } = useContext(AuthContext);
    const [reservation, setReservation] = useState(null);
    const [imgActive, setImgActive] = useState(0);
    const [isCanceled, setIsCanceled] = useState(false);
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
                if (result.status == 'CANCELED') {
                    alert('Réservation annulée avec succès');
                    setIsCanceled(true)
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
                                key={e?.id}
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
                                key={e?.id}
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
                    {
                        reservation?.status === "CANCELED" || isCanceled ?
                            <Text style={styles.canceledTxt}>Réservation annulée</Text>
                            :
                            <CustomButton text="Annuler" onPress={() => customAlert()} type="DANGER" />
                    }
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
    canceledTxt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EE4B2B',
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