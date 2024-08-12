import {View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import useForgotPassword from '../hooks/useForgotPassword'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowError from '../components/ShowError';
import Separator from '../components/Separator'


const NewPassword = ({navigation})=>{

    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [error, setError] = useState(false)

    const {setNewPassword} = useForgotPassword()


    const newPasswordEnter = async()=>{

        if(password.length < 4 || confirmedPassword.length < 4){
            setError(true)
            return
        }


        if(password === confirmedPassword){
            const emailNewPassword = await AsyncStorage.getItem('EMAILNEWPASSWORD')
            setNewPassword(password, emailNewPassword)
            await AsyncStorage.removeItem('EMAILNEWPASSWORD')
            navigation.navigate('Login')
            setError(false)
        }else{
            setError(true)
        }
    }



    return(
        <View style={styles.container}>
            <View style={styles.containerInputs}>
                <TextInput placeholder='Digite sua nova senha'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setPassword(e)}/>
                <TextInput placeholder='Digite novamente sua nova senha'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>{setConfirmedPassword(e)}}/>
                {error && (
                    <View style={{gap: 10}}>
                        <ShowError msg="As senhas nao sao iguais!"/>
                        <ShowError msg="As senhas deve ser maior que 4 caracteres"/>
                    </View>
                )}
                <View style={styles.containerBtn}>
                    <TouchableOpacity style={styles.btnLogin} onPress={newPasswordEnter}>
                        <Text style={{color: 'white'}}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}




const styles = new StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInputs: {
        gap: 15,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 7,
        borderRadius: 5,
        color: 'white'
    },
    containerInputPass: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 7,
        borderRadius: 5,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputPass: {
        width: '90%',
        color: 'white'
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBtn: {
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default NewPassword