import { useState } from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const StatusProfile = ()=>{

    const [openModalProfile, setOpenModalProfile] = useState(false)
    const navigation = useNavigation()

    const handleProfile = ()=>{
        setOpenModalProfile(!openModalProfile)
        navigation.navigate('Profile')
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerProfile} onPress={handleProfile}>

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

    container: {
        backgroundColor: '#18192d',
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        width: '90%',
        marginTop: 10,
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

    }
})


export default StatusProfile