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
    const [loading, setLoading] = useState(false)
    const [emailErro, setEmailErro] = useState('')
    


    const handleRegister = async()=>{

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        setLoading(true)
        if(user && email && password && passwordAgain){//input
            if(regexEmail.test(email)){//input
                if(password === passwordAgain){ //input
                    try{
                        const response = await axios.post('https://gym-pump-api-fgmo.vercel.app/api/register/user', {
                            nome: user,
                            email: email,
                            senha: password
                        })
                        if(response.status === 200){
                            navigation.navigate('Login')
                        }
                    }catch(erro){
                        if(erro.response.data.error){
                            setEmailErro(erro.response.data.error)
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
        setLoading(false)

        

    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerCadastro}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Digite seu nome de usuario'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=> setUser(e)}/>
                        <TextInput placeholder='Digite seu email' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setEmail(e)}/>
                        {emailErro && (
                            <View style={styles.containerError}>
                                <Text>{emailErro}</Text>
                            </View>
                        )}
                        <TextInput placeholder='Digite sua senha' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setPassWord(e)}/>
                        <TextInput placeholder='Digite sua senha novamente' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setPassWordAgain(e)}/>
                    </View>
                    {showError && (
                        <View style={styles.containerError}>
                            <Text>{showError}</Text>
                        </View>
                    )}
                    <View style={styles.containerBtn}>
                        {loading ?(
                            <ActivityIndicator size={20} color='gray'/>
                        ): (
                            <TouchableOpacity style={styles.btnLogin} onPress={handleRegister}>
                                <Text style={styles.txt}>Cadastrar</Text>
                            </TouchableOpacity>
                        )}
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