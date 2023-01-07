import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StarRate = (props) => {
    return (
        <FontAwesome name={props.filled === true ? "star" : "star-o"} size={26} color="gold" style={{ marginRight: 5 }} />
    )
}

export default StarRate;

// <FontAwesome5 name="star" size={24} color="#333" style={{ marginRight: 3 }} />
// <Ionicons name="star" size={24} color="#333" style={{ marginRight: 3 }} />
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
