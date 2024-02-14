import { StyleSheet } from "react-native"

export const homeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        flex: 1,
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
        backgroundColor: '#e0e0e0',
        width: '90%',
        flex: 1,
        borderRadius: 5,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerDia: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingBottom: 10
    },
    containerTxtDia: {
        padding: 10,
        borderRadius: 5,
        width: '100%',
      },
    txtDia: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        backgroundColor: '#18192d',
        padding: 10,
        borderRadius: 5,
    },

    containerValor:{
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerScroll:{
        width: '100%'
    },
    txtValor:{
        textAlign: 'center',
        fontSize: 20
    }
})