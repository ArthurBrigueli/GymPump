import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList, TextInput} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';


const Register = ()=>{

    const navigation = useNavigation()

    const [user, setUser] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassWord] = useState(null)
    const [passwordAgain,setPassWordAgain] = useState(null)
    const [showError, setShowError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [emailErro, setEmailErro] = useState('')

    const [showPass, setShowPass] = useState(true)
    const [showPasstwo, setShowPasstwo] = useState(true)
    const [userErro, setUserErro] = useState(null)
    

    const tenhoUmaConta = ()=>{
        navigation.navigate('Login')
    }

    const handleRegister = async () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        setLoading(true);
    
        if (user && email && password && passwordAgain) { // Check if all fields are filled
            if (regexEmail.test(email)) { // Validate the email format
                if (password === passwordAgain) { // Check if passwords match
                    try {
                        const response = await axios.post('http://192.168.0.102:8082/api/auth/register', {
                            name: user,
                            email: email,
                            password: password
                        });
                        if (response.status === 200) {
                            navigation.navigate('Login');
                        }
                    } catch (erro) {
                        if (erro.response) {
                            if (erro.response.data.error_email) {
                                setEmailErro(erro.response.data.error_email);
                            } else if (erro.response.data.error_user) {
                                setUserErro(erro.response.data.error_user);
                            } else {
                                setShowError('Erro ao registrar. Tente novamente.');
                            }
                        } else {
                            setShowError('Erro ao registrar. Tente novamente.');
                        }
                    }
                } else {
                    setShowError('As senhas não são iguais');
                }
            } else {
                setShowError('Email não válido');
            }
        } else {
            setShowError('Preencha os campos de registro');
        }
        setLoading(false);
    };
    


    const handleShowPassword = ()=>{
        setShowPass(!showPass)
    }

    const handleShowPasswordTwo = ()=>{
        setShowPasstwo(!showPasstwo)
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerCadastro}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Digite seu nome de usuario'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=> setUser(e)}/>
                        {userErro && (
                            <View style={styles.containerError}>
                                <Text>{userErro}</Text>
                            </View>
                        )}
                        <TextInput placeholder='Digite seu email' style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setEmail(e)}/>
                        {emailErro && (
                            <View style={styles.containerError}>
                                <Text>{emailErro}</Text>
                            </View>
                        )}
                        <View style={styles.containerPass}>
                            <TextInput placeholder='Digite sua senha' style={styles.inputPass} placeholderTextColor='gray' onChangeText={(e)=>setPassWord(e)} secureTextEntry={showPass}/>
                            <TouchableOpacity onPress={handleShowPassword}>
                                {showPass ? (
                                    <Ionicons name="eye" size={20} color="gray" />
                                ): (
                                    <Ionicons name="eye-off" size={20} color="gray" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerPass}>
                            <TextInput placeholder='Digite sua senha novamente' style={styles.inputPass} placeholderTextColor='gray' onChangeText={(e)=>setPassWordAgain(e)} secureTextEntry={showPasstwo}/>
                            <TouchableOpacity onPress={handleShowPasswordTwo}>
                                {showPasstwo ? (
                                    <Ionicons name="eye" size={20} color="gray" />
                                ): (
                                    <Ionicons name="eye-off" size={20} color="gray" />
                                )}
                            </TouchableOpacity>
                        </View>
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

                        <TouchableOpacity onPress={tenhoUmaConta}>
                            <Text style={styles.txt}>Já tenho uma conta</Text>
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
        borderRadius: 5,
        padding: 7,
        color: 'white',
        width: '100%',
        height: 50
    },
    inputPass: {
        borderRadius: 5,
        color: 'white',
        width: '90%',
        height: 50
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerPass: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems:"center",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,

    }
})


export default Register