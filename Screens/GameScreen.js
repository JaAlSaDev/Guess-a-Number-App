import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

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
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    // References are detached from the component, so this won't rerender the component
    const currentMin = useRef(1)
    const currentMax = useRef(100);



    // Runs after a render cycle
    useEffect(() => {

        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length)
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

        const newGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(newGuess)

        // setPastGuesses(currentNumberOfRounds => currentNumberOfRounds + 1)
        setPastGuesses(currentPastGuesses => [newGuess, ...currentPastGuesses])
    }


    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.bodyText}>Opponent's Guess: </Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>

            <ScrollView>
                {pastGuesses.map(guess => (<View key={guess}><Text>{guess}</Text></View>))}
            </ScrollView>

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
        width: 400,
        maxWidth: "90%"
    }
})

export default GameScreen;