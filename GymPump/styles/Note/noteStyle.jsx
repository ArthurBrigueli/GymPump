import { StyleSheet } from "react-native";


export const noteStyle = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1
    },

    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 3
    },

    containerbtn: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    btnEdit: {
        borderColor: 'gray',
        borderWidth: 2,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        padding: 10
    },

    btnExcluir: {
        backgroundColor: '#f95959',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        padding: 10,

    },

    containerExercicios: {
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10
    },

    containerTreino: {
        backgroundColor: 'white',
        padding: 10,
        gap: 20,
        margin: 15,
        borderRadius: 5
        
    },


    txt: {
        color: 'white'
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
        zIndex: 0
    },
    remove: {
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 90,
        right: 20,
        zIndex: 0
    },
    txtNome: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})  