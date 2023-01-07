import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (email, password) => {
        setIsLoading(true);
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password,
            }),
        })
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                if (res.code == 401) {
                    alert('Email et/ou mot de passe incorrect(s)');
                }
                else {
                    setUserToken(res.token);
                    AsyncStorage.setItem('userToken', res?.token);
                    AsyncStorage.setItem('userId', res?.data?.id.toString());
                }
            })
            .catch(e => {
                console.log(`Login error ${e}`);
            });
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        setIsLoading(false);
    };

    const getUserInfo = async () => {
        setIsLoading(true);
        let userToken = await AsyncStorage.getItem('userToken');
        setUserToken(userToken);
        fetch(`${API_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken,
            },
        })
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setUserInfo(res);
            });
    };

    const isLoggedIn = () => {
        try {
            getUserInfo();
        } catch (e) {
            console.log(`isLogged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}