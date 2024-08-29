import { StyleSheet } from "react-native"

export const timeStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0c0d17'
    },

    timeTip: {
        zIndex: -1,
        color: '#333863',
        fontSize: 18,
        textAlign: 'center',
        marginTop: -120, // Adicione um espaçamento superior para centralizar verticalmente
      },

    iconTip: { 
        zIndex: 99,
       bottom: '10%',
        right: '10%'
       
       
    },

    containerTime: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },

    containerStatusProfile: {
        alignItems: 'center',
        width: '100%',
    },

    cronometroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    cronometroText:{
        fontSize: 70,
        color: 'white'
    },

    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    botaoComecarSerie: {
        margin: 5,
        backgroundColor: '#00a859',
        borderRadius: 100,
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },


    botaoDescanso:{
        margin: 5,
        backgroundColor: '#3498db',
        borderRadius: 100,
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBotao: {
        color: 'white'
    },
    TextSubTitleCronometro: {
        color: 'gray',
        fontSize: 25
    },

    TextSubTitleSerieOff: {
        color: 'gray',
    },
    btnConfig: {
      backgroundColor: '#18192d',
      justifyContent:'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 100,
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 0
    }
})