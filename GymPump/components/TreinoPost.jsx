import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { noteStyle } from '../styles/Note/noteStyle';
import { Icon } from 'react-native-elements';

import TreinoList from '../components/TreinoItem/TreinoList';
import ExercicioList from '../components/TreinoItem/ExercicioList';

const TreinoPost = ({item, openModalEdit, excluirExercicio, loading, loadingEdit, limitarString})=>{



    return(
        <View style={styles.containerTreino}>
            <TreinoList name={item.nome} data={item.data}/>
            <View style={styles.containerExercicios}>
                {item.exercicios && item.exercicios.map((exercicio, indexE) => (
                    <ExercicioList key={indexE} exercicios={exercicio} limitarText={limitarString}/>
                ))}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    containerTreino: {
        backgroundColor: 'white',
        padding: 10,
        gap: 10,
        borderRadius: 5,
        width: '100%',
    },
    containerExercicios: {
        gap: 7,
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
        backgroundColor: '#271A45',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        padding: 10,

    },
})


export default TreinoPost