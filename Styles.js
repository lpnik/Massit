import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95EBFB',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'space-between',
        flexDirection: 'column',
      },
    hero: {
        textAlign: 'center',
        paddingTop: 150,
        paddingBottom: 50,
    },
    heroText: {
        fontSize: 60,
    },
    input: {
        flexDirection: 'row',
        padding: 2,
        backgroundColor: '#135771',
        margin: 20,
        borderRadius: 5,
        
    },
    inputText: {
        flex: 1,
        fontSize: 20,
        backgroundColor:  '#FFFFFF',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#135771',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 50,
        paddingRight: 50,
        margin: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#EBF3F3'
    },
    box: {
        padding: 50
    },
    boxText: {
        fontSize: 16
    }
})