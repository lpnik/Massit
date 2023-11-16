import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95EBFB',
        alignItems: 'center',
        alignContent: 'space-between',
        flexDirection: 'column',
      },
    hero: {
        textAlign: 'center',
        paddingTop: 100,
        paddingBottom: 50,
    },
    heroText: {
        fontSize: 60,
    },
    heroTextShift: {
        fontSize: 40,
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
    },
    buttons: {
        marginBottom: 50
    },
    buttonStart: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,      
    },
    buttonStartText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonAdd: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        marginLeft: 25,
        marginRight: 25,
        
    },
    buttonAddText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    info: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    infoBox: {
        flexDirection: 'row',
        padding: 2,
        backgroundColor: '#135771',
        margin: 20,
        borderRadius: 5,
    },
    infoInput: {
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'strech',
        justifyContent: 'space-between',
        margin: 8,
    },
})