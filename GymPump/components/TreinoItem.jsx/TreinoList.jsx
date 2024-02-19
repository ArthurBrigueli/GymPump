import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { noteStyle } from '../../styles/Note/noteStyle'

const TreinoList = ({name, data})=>{
    return(
        <View>
            <Text style={noteStyle.txtNome}>{name}</Text>
            <Text>{data}</Text>
        </View>
    )
}

export default TreinoList