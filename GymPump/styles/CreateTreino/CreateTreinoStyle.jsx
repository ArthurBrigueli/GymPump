import { StyleSheet } from "react-native"

export const CreateTreinoStyle = StyleSheet.create({
    container: {
        gap: 20,
        alignItems :'center',
        flex: 1,
        justifyContent: 'space-around'
    },
    containerDate:{
        justifyContent: 'center',
        width: '100%'
    },
    btnDate: {
        width: '50%',
        padding: 10,
        alignItems:"center",
        marginLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    inputTitle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        width: '80%',
    },
    containerInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    containerInputs:{
        width: '100%',
        gap: 20
    },
    containerbtn:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCriar: {
        backgroundColor: 'green',
        width: '50%',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10
    },
    txtBtn:{
        color: 'white',
        fontWeight: 'bold'
    }
})