import { Ionicons } from '@expo/vector-icons'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


const SearchProfile = ({setSearch})=>{
    return(
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput style={{color: 'white', fontSize: 12, marginLeft: 5}} placeholderTextColor="#4D4F7A" placeholder='Digite o nome de usuario' onChangeText={(e)=>{setSearch(e)}}/>
            </View>
            <View>
                <TouchableOpacity>
                    <Ionicons name="search-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: '#18192D',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        borderRadius: 10
    },
    containerInput:{
        width: '90%',
        backgroundColor: '#22233C',
        borderRadius: 5,
        padding: 5
    }
})


export default SearchProfile