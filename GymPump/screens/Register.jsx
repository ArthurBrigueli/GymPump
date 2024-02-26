import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList, TextInput} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';


const Register = ()=>{

    const navigation = useNavigation()

    const handleRegister = ()=>{
        navigation.navigate('Login')
    }

    return(
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <Text style={styles.h1}>GymPump</Text>
                <View style={styles.containerCadastro}>
                    <View style={styles.containerInputs}>
                        <TextInput placeholder='Digite seu nome de usuario'  style={styles.input} placeholderTextColor='gray'/>
                        <TextInput placeholder='Digite seu email' style={styles.input} placeholderTextColor='gray'/>
                        <TextInput placeholder='Digite sua senha' style={styles.input} placeholderTextColor='gray'/>
                        <TextInput placeholder='Digite sua senha novamente' style={styles.input} placeholderTextColor='gray'/>
                    </View>
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
        gap: 60
    },
    containerCadastro: {
        width: '100%',
        gap: 40
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