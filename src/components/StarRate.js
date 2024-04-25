import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarRate = (props) => {
    return (
        <FontAwesome name={props.filled === true ? "star" : "star-o"} size={26} color="gold" style={{ marginRight: 5 }} />
    )
}

export default StarRate;

