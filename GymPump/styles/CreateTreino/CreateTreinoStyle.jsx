import { StyleSheet } from "react-native"

export const CreateTreinoStyle = StyleSheet.create({
    container: {
        alignItems :'center',
        flex: 1,
        justifyContent: 'space-evenly'
    },
    containerDate:{
        justifyContent: 'center',
        width: '100%'
    },
    btnDate: {
        width: '50%',
        height: 50,
        alignItems:"center",
        justifyContent: 'center',
        marginLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    inputTitle: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        width: '80%',
        fontSize: 18
    },
    txtDate: {
        fontSize: 18
    },
    containerInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    containerInputs:{
        width: '100%',
        gap: 20,
    },
    containerbtn:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnCriar: {
        backgroundColor: '#271A45',
        width: '50%',
        alignItems: 'center',
        borderRadius: 8,
        padding: 17,
    },
    txtBtn:{
        color: 'white',
        
        fontSize: 17
    }
})