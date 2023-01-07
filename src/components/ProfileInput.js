import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

const ProfileInput = ({ inputTitle, placeHolder, value }) => {
    return (
        <View>
            <Text style={styles.text}>{inputTitle}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeHolder}
                placeholderTextColor='#DDD'
                defaultValue={value}
                editable={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        opacity: .5,
        color: '#FFF',
    },
    textInput: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#CDCDCD',
        paddingVertical: 5,
        marginBottom: 15,
        color: '#FFF',
    },
});
export default ProfileInput;