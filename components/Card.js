import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {
    return (
        <View
        // props.style overrides styles.card
            style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        // Shadow properties that only work on IOS
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,

        // Only works on Android
        elevation: 10
    }
})


export default Card
