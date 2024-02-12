import { StyleSheet } from "react-native"

export const ModalConfigTimeStyle = StyleSheet.create({
    containerBtnSalvar:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#c2c2c2',
        padding: 10,
        borderRadius: 100,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        justifyContent: 'space-around',
        gap: 5
    },
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    txtBtn:{
        color: 'black',
        fontWeight: 'bold'
    },
    containerTextTitle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})