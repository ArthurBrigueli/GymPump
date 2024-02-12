import { StyleSheet } from "react-native";


export const noteStyle = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1
    },

    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'gray'
    },

    containerbtn: {
        alignItems: 'flex-end',
    },

    btnExcluir: {
        backgroundColor: 'gray',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})