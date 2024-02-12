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
        backgroundColor: 'gray',
        margin: 10
    },
    Text: {
        color: 'white'
    },
    BackContainerModal: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    containerModal: {
        backgroundColor: 'gray',
        width: '70%',
        padding: 30,
        alignItems: 'center',
        justifyContent:"space-around",
        borderRadius: 10,
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
        borderRadius:5,
        width: '90%',
        color: 'white',
        paddingLeft: 10
    }
})