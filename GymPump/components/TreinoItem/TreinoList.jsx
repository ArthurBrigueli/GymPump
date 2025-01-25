import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { noteStyle } from '../../styles/Note/noteStyle'
import { format } from 'date-fns'
import { Ionicons } from '@expo/vector-icons'

const TreinoList = ({name, data, share})=>{

    const date = new Date()
    const dataform = format(date, 'dd/MM/yyyy')

    return(
        <View style={styles.container}>
            <View>
                <Text style={noteStyle.txtNome}>{name}</Text>
                <Text>{data}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    containerDate: {
        width: 15,
        height: 15,
        backgroundColor: '#271A45',
        borderRadius: 100
    }
})

export default TreinoList