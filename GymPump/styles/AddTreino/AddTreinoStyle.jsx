import { StyleSheet } from "react-native"

export const AddTreinoStyle = StyleSheet.create({
    containerInf: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 20

    },
    containerExercicios: {
        
    },
    btnAdd: {
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },

    btnsave: {
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 85,
        right: 20,
    },
    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight:25,
        padding: 10,
        backgroundColor: '#31346C',
        margin: 10,
        borderRadius: 5
    },

    containerBtnTrash: {
        
    },

    containerExercicioInfo: {
        flexDirection: "column",
        gap: 3
    },


    btnExcluir:{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 8
        
    },

    TextTitulo: {
        color: 'white',
        fontSize: 17
    },


    Text: {
        color: 'white',
        fontSize: 14
    },


    BackContainerModal: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    containerModal: {
        backgroundColor: '#E8E8E8',
        width: '90%',
        height: '100vh',
        padding: 30,
        alignItems: 'center',
        justifyContent:"space-around",
        borderRadius: 30,
        borderColor: 'black',
        borderWidth: 2,
        gap:30
    },
    containerInputs: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        gap: 15
    },
    inputText: {
        borderColor: 'black',
        borderWidth:1,
        borderRadius:20,
        width: '90%',
        height: 50,
        color: 'black',
        textAlign: 'center'
    },
    
    
    addTreino: {
        padding: 10,
        borderRadius: 20,
        width: '60%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    }
})