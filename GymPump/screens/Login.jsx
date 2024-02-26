import { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

const Login = ({navigation})=>{

    const [showPass, setShowPass] = useState(true)

    const handleLogin = ()=>{
        navigation.navigate('Home')
    }

    const handleCriarConta = ()=>{
        navigation.navigate('Register')
    }

    const handleShowPassword = ()=>{
        setShowPass(!showPass)
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerLogin}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Usuario'  style={styles.input} placeholderTextColor='gray'/>
                        <View style={styles.containerInputPass}>
                            <TextInput placeholder='Senha' style={styles.InputPass} placeholderTextColor='gray' secureTextEntry={showPass}/>
                            <TouchableOpacity onPress={handleShowPassword}>
                                {showPass ? (
                                    <Ionicons name="eye" size={20} color="gray" />
                                ): (
                                    <Ionicons name="eye-off" size={20} color="gray" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerEsqueceu}>
                        <TouchableOpacity>
                            <Text style={styles.txt}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                            <Text style={styles.txt}>Login</Text>
                        </TouchableOpacity>
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
    h1: {
        color: 'white',
        fontSize: 45,
    },
    txt: {
        color: 'white'
    },
    containerForm: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        height: '50%',
        gap: 30
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
        color: 'white'
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
})


export default Login