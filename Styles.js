import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#95EBFB',
        alignItems: 'center',
        alignContent: 'space-between',
        flexDirection: 'column',
    },
    containerWork: {
        flex: 1,
        backgroundColor: '#95EBFB',
        alignItems: 'center',
        flexDirection: 'column',
    },
    hero: {
        textAlign: 'center',
        paddingTop: 100,
        paddingBottom: 50,
    },
    heroWork: {
        textAlign: 'center',
        padding: 50,
    },
    heroText: {
        fontFamily: "MarheyRegular",
        fontSize: 60,
    },
    heroTextShift: {
        fontSize: 40,
    },
    box: {
        paddingTop: 25,
        paddingBottom: 50,
    },
    boxText: {
        fontSize: 30,
        fontFamily: "MarheyRegular",
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
        backgroundColor: '#FFFFFF',
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        fontSize: 16,
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
    showShifts: {
        alignItems: 'center',
        alignSelf: 'strech',
        margin: 10,
    },
    linearGradient: {
        borderRadius: 5,
        width: 300,
    },
    shiftsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        margin: 2,
        backgroundColor: '#fff',
        padding: 10,
      },
    shifts: {
        fontSize: 16,
        fontWeight: 'bold',
        //fontFamily: 'Gill Sans',
        //backgroundColor: '#95EBFB',
    },
    shiftsText: {
        fontSize: 16,
        fontWeight: 'light',
        color: '#135771',
    },
    shiftsRemove: {
        fontSize: 16,
        //fontFamily: 'Gill Sans',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#BE77EF',
    },
})