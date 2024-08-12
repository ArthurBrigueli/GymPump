import {View, Text, StyleSheet} from 'react-native'

const ShowError = ({msg})=>{
    return(
        <View style={styles.container}>
            <Text>{msg}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fc95a1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5
    }
})


export default ShowError