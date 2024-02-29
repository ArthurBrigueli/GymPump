import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';


const Profile = ()=>{

    const navigation = useNavigation()
    const {user, token, logoutAuth} = useAuth()
    
    const handleLogout = async()=>{
        logoutAuth()
    }

    const handleLogin = ()=>{
        navigation.navigate('Login')

    }

    return(
        <View style={styles.container}>
            {token ? (
                <>
                    <View style={styles.containerProfile}>
                        <View style={styles.containerIconProfile}>
                            {token && (<Text style={styles.txtIcon}>{user.nome[0]}</Text>)}
                        </View>
                        <View>
                            <Text style={styles.txt}>{user.nome}</Text>
                            <Text style={styles.txt}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={styles.containerBtnLogout}>
                        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                            <Text style={styles.txt}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ):(
                <View style={styles.containerNotLoggin}>
                    <TouchableOpacity style={styles.btnLogout} onPress={handleLogin}>
                        <Text style={styles.txt}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'space-between'
    },

    txtIcon: {
        fontSize: 20   
    },
    containerNotLoggin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: 'white'
    }

})


export default Profile