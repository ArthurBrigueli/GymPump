import { View, StyleSheet, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';

const TutorialNote = ()=>{
    return(
        <View style={styles.container}>
            <Ionicons name="copy-outline" size={200} color="white" />
            <Text style={styles.txtTitle}>Anote seus treinos</Text>
            <Text style={styles.txtDesc}>Anote seu treinos diários, e tenha uma análise de progressão de carga em todos os seus exercícios</Text>
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


export default TutorialNote