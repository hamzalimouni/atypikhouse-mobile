import React, { useState, useContext } from "react";
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet, Linking } from "react-native";
import CustomInput from "../components/customInput";
import CustomButton from "../components/CustomButton";
import Logo from "../../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";

const WEB_PAGE_URL = 'https://www.google.com/';
const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const openLinkInBrowserHandler = () => {
        Linking.canOpenURL(WEB_PAGE_URL).then((supported) => {
            supported && Linking.openURL(WEB_PAGE_URL);
        });
    };
    const onForgotPasswordPressed = () => {
        console.warn('Forgot Password Success');
    };
    const handleCheckEmail = (text) => {
        let re = /\S+@\S+\.\S+/;
        let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        setEmail(text);
        if (re.test(text) || regex.test(text)) {
            setCheckValidEmail(false);
        }
        else {
            setCheckValidEmail(true);
        }
    };
    return (
        <View style={styles.container}>
            <Image style={styles.logo}
                source={Logo} />
            <View style={styles.wrapper}>
                <CustomInput
                    value={email}
                    setValue={(text) => setEmail(text)}
                    onBlur={() => handleCheckEmail(email)}
                    placeholder="Entrer email" />
                {checkValidEmail ?
                    <Text style={styles.emailError}>Le format de votre email est inccorect!</Text>
                    : <Text></Text>}
                <CustomInput
                    value={password}
                    setValue={setPassword}
                    placeholder="Entrer Mot de passe"
                    secureTextEntry={true} />
                <CustomButton text="Connexion" onPress={() => { login(email, password) }} />
                <CustomButton text="Mot de passe oublié?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                {/* <View style={styles.register}>
                    <Text>Vous-avez pas un compte? </Text>
                    <TouchableOpacity onPress={openLinkInBrowserHandler}>
                        <Text style={styles.link}>Inscription</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logo: {
            marginBottom: 40,
        },
        wrapper: {
            width: '80%',
        },
        link: {
            color: 'blue',
        },
        register: {
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
        },
        emailError: {
            fontSize: 14,
            color: 'red',
            marginTop: 5,
            marginBottom: 15,
        }
    }
);

export default LoginScreen;