import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({ onPress, text, type = "PRIMARY" }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_DANGER: {
        backgroundColor: '#dc3545',
    },
    container_TERTIARY: {},
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    text_TERTIARY: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 17,
    },
});
export default CustomButton;
