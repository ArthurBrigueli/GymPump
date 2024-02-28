import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Profile = ()=>{

    const navigation = useNavigation()

    const handleLogout = ()=>{
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerProfile}>
                <View style={styles.containerIconProfile}>

                </View>
                <View>
                    <Text style={styles.txt}>Arthur</Text>
                    <Text style={styles.txt}>20/02/2024</Text>
                </View>
            </View>

            <View style={styles.containerBtnLogout}>
                <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                    <Text style={styles.txt}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'space-between'
    },
    containerProfile: {
        backgroundColor: '#18192d',
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        gap: 15
    },

    containerBtnLogout: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnLogout: {
        backgroundColor: '#18192d',
        borderRadius: 100,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerIconProfile: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 100
    },
    txt: {
        color: 'white'
    }

})


export default Profile