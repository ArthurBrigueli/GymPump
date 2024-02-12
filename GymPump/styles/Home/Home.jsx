import { StyleSheet } from "react-native"

export const homeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        flex: 1
    },
    botao:{
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1
    },
    txtBotaoAddFolha: {
        color: 'white'
    },
    containerFolha: {
        backgroundColor: 'white',
        width: '90%',
        flex: 1,
        borderRadius: 5,
        margin: 20
    },
    containerDia: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        width: '100%',
        margin: 10,
    },
    containerTxtDia: {
        width: '100%',
    },
    txtDia: {
        marginLeft: 10
    }
})