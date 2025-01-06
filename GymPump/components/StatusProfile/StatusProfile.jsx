import { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';


const StatusProfile = ()=>{

    const [openModalProfile, setOpenModalProfile] = useState(false)
    const navigation = useNavigation()
    const { user, token } = useAuth()
    const [showInfoLocal, setShowInfoLocal] = useState(false)

    const handleProfile = ()=>{
        setOpenModalProfile(!openModalProfile)
        navigation.navigate('Profile')
    }

    const handleInfoLocal = ()=>{
        setShowInfoLocal(!showInfoLocal)
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerProfile} onPress={handleProfile}>
                {user && (<Text>{user.nome[0]}</Text>)}
            </TouchableOpacity>

        </View>

    )
}


const styles = StyleSheet.create({



    containerModalProfile:{
        position: 'absolute',
        top: '100%',
        right: '100%',
        backgroundColor: 'purple',
        width: 140,
        height: 150
    },

    containerInfo: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    container: {
        backgroundColor: '#18192d',
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        width: '90%',
        marginTop: 10,
        alignItems: 'center',
    },
    containerProfile: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
        marginRight: 15,
        borderColor: 'gray',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    txt: {
        color:'white'
    }

})


export default StatusProfile