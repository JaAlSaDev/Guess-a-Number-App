import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'


const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game</Text>

            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <TextInput />

                <View style={styles.buttonContainer}>

                    <View style={styles.button} onPress={() => { }}>
                        <Button title="Reset" color={Colors.accent} />
                    </View>

                    <View style={styles.button} onPress={() => { }}>
                        <Button title="Confirm" color={Colors.primary} />
                    </View>

                </View>

            </Card>
        </View>
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
        marginVertical: 10
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
        // backgroundColor: "#108acc",
        width: 100,
        // alignItems: "center",
        // paddingVertical: 5

    },
    buttonText: {
        color: "white",
        width: "100%"
    }
})

export default StartGameScreen
