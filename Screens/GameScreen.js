import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    let randomNum = Math.floor(Math.random() * (max - min) + min)


    while (randomNum == exclude) {
        randomNum = Math.floor(Math.random() * (max - min) + min)
    }


    return randomNum;

}



const GameScreen = props => {
    const { userChoice, onGameOver } = props;

    const [numOfRounds, setNumberOfRounds] = useState(0)
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice))

    // References are detached from the component, so this won't rerender the component
    const currentMin = useRef(1)
    const currentMax = useRef(100);



    // Runs after a render cycle
    useEffect(() => {

        if (currentGuess == userChoice) {
            onGameOver(numOfRounds)
        }


        // Only runs useEffect if the values in the 
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        // Incorrect hint
        if ((direction == 'lower' && userChoice > currentGuess) ||
            (direction == 'greater' && userChoice < currentGuess)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ])

            return;
        }



        // Correct hint
        if (direction == 'lower') {
            currentMax.current = currentGuess

        } else if (direction == 'greater') {
            currentMin.current = currentGuess + 1;
        }

        setCurrentGuess(generateRandomBetween(currentMin.current, currentMax.current, currentGuess))

        setNumberOfRounds(currentNumberOfRounds => currentNumberOfRounds + 1)
    }


    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess: </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => nextGuessHandler('lower')} />
                <Button title="GREATER" onPress={() => nextGuessHandler('greater')} />
            </Card>

        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    }
})

export default GameScreen;