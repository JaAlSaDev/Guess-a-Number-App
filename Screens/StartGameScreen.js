import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'


const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue("")
        setIsConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) ||
            chosenNumber <= 0 ||
            chosenNumber > 99) {

            Alert.alert("Invalid number!", "Number has to be in the range of 1 to 99.", [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }

        // These state changes are batched together in one render cycle
        setIsConfirmed(true);
        /* It's ok to place this below "setEnteredValue",
         because the value will only change in the next render cycle*/
        setSelectedNumber(parseInt(chosenNumber))
        setEnteredValue("")


        Keyboard.dismiss()

    }

    let confirmedOutput;

    if (isConfirmed) {
        confirmedOutput = (
            <Card style={styles.summeryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton
                    onPress={() => { props.startGame(selectedNumber) }}>
                    START GAME
                </MainButton>
            </Card >)
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game</TitleText>

                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>

                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />

                    <View style={styles.buttonContainer}>

                        <View style={styles.button} >
                            <Button
                                title="Reset"
                                color={Colors.accent}
                                onPress={resetInputHandler} />
                        </View>

                        <View style={styles.button} >
                            <Button
                                title="Confirm"
                                color={Colors.primary}
                                onPress={confirmInputHandler}
                            />
                        </View>

                    </View>

                </Card>
                {confirmedOutput}
            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summeryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
})

export default StartGameScreen
