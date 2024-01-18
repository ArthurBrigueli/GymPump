import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"
import CreateFolha from "../components/CreateFolha"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";


const Home = ()=>{

    const [modalOpen, setIsModalOpen] = useState(false)
    const [dataFolha, setDataFolha] = useState([])

    const openModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    const remove = async()=>{
        Alert.alert(
            "Confirmar Remoção",
            "Tem certeza de que deseja remover a folha de treino?",
            [
              {
                text: "Cancelar",
                style: "cancel",
              },
              {
                text: "Excluir",
                onPress: async () => {
                  // Lógica de remoção
                  await AsyncStorage.removeItem('FolhaDeTreino');
                  setDataFolha([]);
                },
              },
            ],
            { cancelable: false }
          );
    }

    useEffect(()=>{
        const getData = async()=>{
            const data = await AsyncStorage.getItem('FolhaDeTreino')
            const dataForm = JSON.parse(data)
            setDataFolha(dataForm)
        }
        getData()
    }, [modalOpen, dataFolha])


    return(
        <View style={styles.container}>
            {!Array.isArray(dataFolha) ? (
                <TouchableOpacity style={styles.botao} onPress={openModal}>
                    <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
            ):(
                <TouchableOpacity style={styles.botao} onPress={remove}>
                    <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
            )}
            <CreateFolha isOpen={modalOpen} closeModal={closeModal}/>

            
            {Array.isArray(dataFolha)&&(
                <View style={styles.containerFolha}>
                    <ScrollView>
                        {Array.isArray(dataFolha) && dataFolha.map((item, index)=> (
                            <View key={index} style={styles.containerDia}>
                                <View style={styles.containerTxtDia}>
                                    <Text style={styles.txtDia}>{item.dia}</Text>
                                </View>
                                <View style={styles.containerValor}>
                                    <Text>{item.valor}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        flex: 1
    },
    botao:{
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1
    },
    txtBotaoAddFolha: {
        color: 'white'
    },
    containerFolha: {
        backgroundColor: 'white',
        width: '90%',
        flex: 1,
        borderRadius: 5,
        margin: 20
    },
    containerDia: {
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        width: '100%',
        margin: 10,
    },
    containerTxtDia: {
        width: '100%',
    },
    txtDia: {
        marginLeft: 10
    }
})

export default Home