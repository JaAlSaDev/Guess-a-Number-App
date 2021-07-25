import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as ScreenOrientation from 'expo-screen-orientation'

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    let randomNum = Math.floor(Math.random() * (max - min) + min)


    while (randomNum == exclude) {
        randomNum = Math.floor(Math.random() * (max - min) + min)
    }


    return randomNum;

}
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}: </BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>)

const GameScreen = props => {

    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    

    const { userChoice, onGameOver } = props;
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    // References are detached from the component, so this won't rerender the component
    const currentMin = useRef(1)
    const currentMax = useRef(100);


    useEffect(() => {
        const updateLayout = ()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height)
            setAvailableDeviceWidth(Dimensions.get('window').width)
        }
        Dimensions.addEventListener('change',updateLayout)


        return () =>{
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [])

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
        setPastGuesses(currentPastGuesses => [newGuess.toString(), ...currentPastGuesses])
    }

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig
    }


    if (availableDeviceHeight < 500) {
        return (<View style={styles.screen}>
            <Text style={defaultStyles.bodyText}>Opponent's Guess: </Text>


            <View style={styles.controls}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>

                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            {/* <Card style={styles.buttonContainer}>


            </Card> */}

            {/* <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View> */}


            <FlatList
                keyExtractor={item => item}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                style={listContainerStyle}
            />
        </View>)
    }
    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.bodyText}>Opponent's Guess: </Text>

            <NumberContainer>
                {currentGuess}
            </NumberContainer>

            <Card style={{...styles.buttonContainer, ...{
                 marginTop: availableDeviceHeight > 600 ? 20 : 5,
            }}}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>

            {/* <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View> */}


            <FlatList
                keyExtractor={item => item}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}
                style={listContainerStyle}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },

    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "80%"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
       
        width: 400,
        maxWidth: "90%"
    },

    listContainerBig: {
        width: '80%',
        flex: 1,
    },

    listContainer: {
        width: '60%',
        flex: 1,
    },
    list: {
        // alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end'
    }
    ,
    listItem: {
        width: '100%',
        flexDirection: 'row',

        borderColor: '#ccc',
        borderWidth: 1,

        padding: 15,
        marginVertical: 10,

        backgroundColor: 'white',
        justifyContent: 'space-between'
    }
})

export default GameScreen;