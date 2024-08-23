import { View, StyleSheet, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';

const TutorialFicha = ()=>{
    return(
        <View style={styles.container}>
            <Ionicons name="calendar-number-outline" size={200} color="white" />
            <Text style={styles.txtTitle}>Crie sua ficha</Text>
            <Text style={styles.txtDesc}>Crie sua ficha de treino da semana e tenha sempre disponível em seu dispositivo</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 10
    },
    containerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 10
    },
    txtTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    },
    txtDesc: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    },
    txt: {
        color: 'white'
    },
})


export default TutorialFicha