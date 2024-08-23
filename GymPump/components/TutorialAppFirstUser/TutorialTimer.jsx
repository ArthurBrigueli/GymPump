import { View, StyleSheet, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';

const TutorialTimer = ()=>{
    return(
        <View style={styles.container}>
            <Ionicons name="timer-outline" size={200} color="white" />
            <Text style={styles.txtTitle}>Cronometre seu descanço</Text>
            <Text style={styles.txtDesc}>Cronometre seu descanço e seja alertado para começar sua nova série</Text>
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


export default TutorialTimer