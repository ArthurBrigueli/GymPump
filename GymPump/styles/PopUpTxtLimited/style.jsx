import { StyleSheet } from "react-native";


const noteStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        position: 'absolute',
        bottom: 30,
        padding: 10,
        zIndex: 1,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        width: '80%'
    },
    txt: {
        color: 'black'
    }
})


export default noteStyle