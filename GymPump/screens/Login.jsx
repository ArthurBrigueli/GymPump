import { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator} from 'react-native'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../context/AuthContext';

const Login = ({navigation})=>{

    const [showPass, setShowPass] = useState(true)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const {updateUserState} = useAuth()
    const [showError, setShowError] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{

        const persistenceLogin = async()=>{


            setLoading(true)
            

            const token = await AsyncStorage.getItem('TOKEN')
            if(token){
                const a = await axios.post('http://192.168.0.102:8082/api/auth/persistence', {
                    token: token
                }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
        
                if(a.status == 200){
                    updateUserState(a.data, token)
                    navigation.navigate('MainTabs', {screen: 'Home'})
                }else{
                    await AsyncStorage.removeItem("TOKEN")
                }
            }
            setLoading(false)
        }
    
        persistenceLogin()
      },[])
    



    const handleLogin = async()=>{

        setLoading(true)
        try{
            const response = await axios.post('http://192.168.0.102:8082/api/auth/login', {
                name: user,
                password: password
            })
            updateUserState(response.data.user, response.data.token)
            await AsyncStorage.setItem('TOKEN', response.data.token)
            navigation.navigate('MainTabs', {screen: 'Home'})
            setShowError(null)
        }catch(erro){
            setShowError('Credenciais incorreta')
        }
        setLoading(false)
    }

    const handleCriarConta = ()=>{
        navigation.navigate('Register')
    }

    const handleShowPassword = ()=>{
        setShowPass(!showPass)
    }

    const handleForgotPassword = ()=>{
        navigation.navigate('ForgotPassword')
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerLogin}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Usuario'  style={styles.input} placeholderTextColor='gray' onChangeText={(e)=>setUser(e)}/>
                        <View style={styles.containerInputPass}>
                            <TextInput placeholder='Senha' style={styles.InputPass} placeholderTextColor='gray' secureTextEntry={showPass} onChangeText={(e)=>setPassword(e)}/>
                            <TouchableOpacity onPress={handleShowPassword}>
                                {showPass ? (
                                    <Ionicons name="eye" size={20} color="gray" />
                                ): (
                                    <Ionicons name="eye-off" size={20} color="gray" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showError && (
                        <View style={styles.containerErro}>
                            <Text>{showError}</Text>
                        </View>
                    )}
                    <View style={styles.containerEsqueceu}>
                        <TouchableOpacity onPress={handleForgotPassword}>
                            <Text style={styles.txt}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBtn}>
                        {loading ? (
                            <ActivityIndicator size={20} color='gray'/>
                        ):(
                            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                                <Text style={styles.txt}>Login</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleCriarConta}>
                            <Text style={styles.txt}>Criar conta</Text>
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
    containerErro: {
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
        gap: 20
    },
    containerLogin: {
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
        color: 'white',
        height: 50
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerInputPass: {
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        paddingRight: 10,
        borderRadius: 5,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    InputPass: {
        width: '90%',
        color: 'white',
        height: 50
    }
})


export default Login