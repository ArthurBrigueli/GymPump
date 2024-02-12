import { StyleSheet } from "react-native"

export const CreateFolhaStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#18192d',
    },

    botaoFechar: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#31346c',
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBtnFechar:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },

    containerAddFolha: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    },
    btnSubmit: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#18192d'
    },

    txtBtn: {
        color: 'white'
    }
})