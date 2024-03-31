import { useState } from "react"
import { Modal, StyleSheet, Text, View, TouchableNativeFeedback, TextInput, TouchableOpacity } from "react-native"
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"


const ModalDeletarConta = ({showModal})=>{


    var SECRETTXTCONFIRMED = 'Deletar minha conta'


    const [password, setPassword] = useState('')
    const [txtConfirmed, setTextConfirmed] = useState('')
    const {token, user, logoutAuth} = useAuth()
    const [error, setError] = useState('')

    const deletarConta = async()=>{


        const result = await axios.post('https://gym-pump-api.vercel.app/api/user/verification/password', {
            email: user.email,
            senha: password
        })

        if(result.data.result){
            if(SECRETTXTCONFIRMED === txtConfirmed){

                const result  = await axios.delete(`https://gym-pump-api.vercel.app/api/user/delete/${user.id}`)
                showModal()
                logoutAuth()
            }
        }

    }



    return(
        <Modal transparent style={styles.modal}>
            <View style={styles.containerModal}>
                <View style={styles.container}>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.input} placeholder="Digite sua senha" onChangeText={(e)=>{setPassword(e)}} secureTextEntry/>
                        <TextInput style={styles.input} placeholder="Digite: Deletar minha conta" placeholderTextColor="#A5A5A5" onChangeText={(e)=>{setTextConfirmed(e)}}/>
                    </View>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btnCancelar} onPress={showModal}>
                            <Text style={styles.txt}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnExcluir} onPress={deletarConta}>
                            <Text style={styles.txtDelete}>Deletar conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"

    },
    txt:{
        color: 'white'
    },
    txtDelete: {
        color: "#A5A5A5"
    },
    container: {
        width: "80%",
        backgroundColor:"white",
        borderRadius: 10,
        padding: 10,
        gap: 10
    },
    input: {
        borderColor: '#A5A5A5',
        borderWidth: 2,
        borderRadius: 5,
        height: 50,
        padding: 10
    },
    containerInput: {
        gap: 10
    },
    containerBtn: {
        flexDirection: "row",
        justifyContent:"space-between",
    },
    btnCancelar: {
        borderRadius: 5,
        backgroundColor: '#A180FF',
        width: "40%",
        justifyContent:"center",
        alignItems:"center",
        height: 50
    },
    btnExcluir: {
        justifyContent:"center",
        alignItems:"center",
        width: "40%",
        height: 50
    }
})


export default ModalDeletarConta