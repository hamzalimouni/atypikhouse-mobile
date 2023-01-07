import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, onBlur }) => {
    return (
        <View>
            <TextInput style={styles.input}
                value={value}
                onChangeText={setValue}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry} />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: 'white'
    },
});
export default CustomInput;