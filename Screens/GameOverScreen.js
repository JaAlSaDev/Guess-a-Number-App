import React from 'react'
import { View, Button, StyleSheet, Image, Text } from 'react-native'
import Colors from '../constants/colors'
import BodyText from '../components/BodyText'

import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'
const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over!</TitleText>
            <View style={styles.imageContainer}>

                {/* Local Image */}
                {/* React Native knows the height and width */}
                <Image

                    source={require('../assets/success.png')}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Networked Image */}
                {/* React Native does not know the height and width, so you have to set them manually */}
                {/* <Image
                    // in milliseconds
                    fadeDuration={1000}
                    source={{uri: 'https://media.istockphoto.com/photos/ama-dablam-mount-in-the-nepal-himalaya-picture-id485966046?k=6&m=485966046&s=612x612&w=0&h=rpI0-lFzV1XwBNwV5stQy_cDeICYTN8xGn_O0dOlync='}}
                    style={styles.image}
                    resizeMode="cover"
                /> */}
            </View>

            <View style={styles.resultsContainer}>
                {/* Nested Text receives the style of the parent Text */}
                <BodyText style={styles.resultsText}>Your phone needed <Text style={styles.highlight}>{props.guessRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>

            {/* <BodyText>Number was: {props.userNumber}</BodyText> */}

            <MainButton onPress={props.onNewGame} >NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',

        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },

    resultsContainer: {
        marginHorizontal: 30,
        marginVertical: 15
        // alignItems: 'center'
    },

    resultsText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        textAlign: 'center'
    }
})

export default GameOverScreen