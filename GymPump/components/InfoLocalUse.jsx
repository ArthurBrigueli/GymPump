import {View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native'


const InfoLocalUser = ({handleInfoLocal})=>{
    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleInfoLocal}>
                <Text style={styles.txt}>Ao usar o modo Local voce compreende que caso o aplicativo seja excluido voce perdera tudo que salvou e tera que começar do zero</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#31346c',
        width: '60%',
        height: 150,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
        borderRadius: 10
    },
    txt: {
        textAlign: 'center',
        color: 'white'
    }
})

export default InfoLocalUser