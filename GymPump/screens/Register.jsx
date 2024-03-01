import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList, TextInput} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios'


const Register = ()=>{

    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassWord] = useState(null)
    const [passwordAgain,setPassWordAgain] = useState(null)
    const [showError, setShowError] = useState(null)
    


    const handleRegister = async()=>{

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(user && email && password && passwordAgain){
            if(regexEmail.test(email)){
                if(password === passwordAgain){
                    try{
                        await axios.post('http://192.168.0.103:8000/api/register/user', {
                        nome: user,
                        email: email,
                        senha: password
                        })
                        navigation.navigate('Login')
                    }catch(error){
                        if(error.response && error.response.data && error.response.data.error){
                            setShowError(error.response.data.error)
                        }
                    }
                }else{
                    setShowError('As senhas nao sao iguais')
                }
            }else{
                setShowError('Email nao valido')
            }
        }else{
            setShowError('Preencha os campos de registro')
        }
        

    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerCadastro}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Digite seu nome de usuario'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=> setUser(e)}/>
                        <TextInput placeholder='Digite seu email' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setEmail(e)}/>
                        <TextInput placeholder='Digite sua senha' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setPassWord(e)}/>
                        <TextInput placeholder='Digite sua senha novamente' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setPassWordAgain(e)}/>
                    </View>
                    {showError && (
                        <View style={styles.containerError}>
                            <Text>{showError}</Text>
                        </View>
                    )}
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
                            <Text style={styles.txt}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerError: {
        backgroundColor: '#fc95a1',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5
    },
    h1: {
        color: 'white',
        fontSize: 45,
    },
    txt: {
        color: 'white'
    },
    containerForm: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 100,
        gap: 30
    },
    containerCadastro: {
        width: '100%',
        gap: 15
    },
    containerInputs: {
        gap: 15
    },
    containerEsqueceu: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    containerBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 7,
        borderRadius: 5,
        color: 'white'
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Register