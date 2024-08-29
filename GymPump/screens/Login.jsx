import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Animated } from 'react-native'
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {

    const [showPass, setShowPass] = useState(true)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const { updateUserState } = useAuth()
    const [showError, setShowError] = useState(null)
    const [loading, setLoading] = useState(false)

    // Referências para a animação
    const fillAnim = useRef(new Animated.Value(0)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;


    useEffect(() => {

        const persistenceLogin = async () => {

            setLoading(true)

            const token = await AsyncStorage.getItem('TOKEN')
            if (token) {
                const a = await axios.post('https://gym-pump-api.vercel.app/api/authentication/login', {
                    token: token
                })

                updateUserState(a.data, token)
                navigation.navigate('MainTabs', { screen: 'Home' })
            }
            setLoading(false)
        }

        persistenceLogin()
    }, [])

    // Adiciona cor e executa a animação caso o login seja bem-sucedido
    // Função para iniciar a animação e retornar à cor original
    const animateButton = () => {
        Animated.parallel([
            Animated.timing(fillAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: false,
            }),
            Animated.timing(colorAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: false,
            }),
        ]).start(() => {
            // Depois de completar a animação inicial, aguarda 3 segundos e inicia a animação de retorno
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(fillAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                    Animated.timing(colorAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: false,
                    }),
                ]).start();
            }, 3000); // 3 segundos de espera
        });
    };


    const handleLogin = async () => {

        setLoading(true)
        try {
            const response = await axios.post('https://gym-pump-api.vercel.app/api/login/user', {
                nome: user,
                senha: password
            })
            updateUserState(response.data.user, response.data.token)
            await AsyncStorage.setItem('TOKEN', response.data.token)


            animateButton();

            // Fim da animação

            //Tempo para exetuar a animação
            setTimeout(() => {
                navigation.navigate('MainTabs', { screen: 'Home' });
                // Retorna o botão de login para a cor original
            }, 1000); // Atraso antes de navegar



        } catch (erro) {

            setShowError('Credenciais incorreta')
        }
        setLoading(false)
    }

    const handleCriarConta = () => {
        navigation.navigate('Register')
    }

    const handleShowPassword = () => {
        setShowPass(!showPass)
    }

    const handleJoinLocal = () => {
        navigation.navigate('MainTabs', { screen: 'Home' })
    }

    // Interpolação para mudança da cor
    const backgroundColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#31346c', '#4BB543'], // cor inicial e cor final
    });

    // Animar a largura do gradiente de preenchimento
    const fillWidth = fillAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'], // de largura zero para largura total
    });

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerLogin}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Usuario' style={styles.input} placeholderTextColor='gray' onChangeText={(e) => setUser(e)} />
                        <View style={styles.containerInputPass}>
                            <TextInput placeholder='Senha' style={styles.InputPass} placeholderTextColor='gray' secureTextEntry={showPass} onChangeText={(e) => setPassword(e)} />
                            <TouchableOpacity onPress={handleShowPassword}>
                                {showPass ? (
                                    <Ionicons name="eye" size={20} color="gray" />
                                ) : (
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
                        <TouchableOpacity>
                            <Text style={styles.txt}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBtn}>
                        {loading ? (
                            <ActivityIndicator size={20} color='gray' />
                        ) : (
                            //view para a animação do botão
                            <Animated.View style={[styles.innerButton, { backgroundColor }]}>
                                <Animated.View style={[styles.fillOverlay, { width: fillWidth, backgroundColor: '#4BB543' }]} />
                                <TouchableOpacity style={styles.buttonContent} onPress={handleLogin}>
                                    <Text style={styles.txt}>Login</Text>
                                </TouchableOpacity>

                            </Animated.View>
                        )}
                        <TouchableOpacity onPress={handleCriarConta}>
                            <Text style={styles.txt}>Criar conta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleJoinLocal}>
                            <Text style={styles.txt}>Entrar localmente</Text>
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
        color: 'white'
    },
    btnLogin: {
        backgroundColor: '#31346c',
        width: 300,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    innerButton: {
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // necessário para o overlay
    },

    buttonContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: 300,
        zIndex: 2, // coloca o texto sobre o overlay
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