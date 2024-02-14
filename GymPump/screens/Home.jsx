import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"
import CreateFolha from "../components/CreateFolha"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import { homeStyle } from "../styles/Home/Home";

import useFetchFolha from "../hooks/useFetchFolha";

const Home = ()=>{

    const [modalOpen, setIsModalOpen] = useState(false)
    const [dataFolha, setDataFolha] = useState([])
    const {add, data:item, remove:removeFolha} = useFetchFolha('FolhaDeTreino')

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
                  removeFolha()
                  setDataFolha([]);
                },
              },
            ],
            { cancelable: false }
          );
    }


    const handleSubmit = async(data)=>{
        add(data)
        closeModal()
        setDataFolha([])
    }

    return(
        <View style={homeStyle.container}>
            {!Array.isArray(item) ? (
                <TouchableOpacity style={homeStyle.botao} onPress={openModal}>
                    <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
            ):(
                <TouchableOpacity style={homeStyle.botao} onPress={remove}>
                    <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
            )}
            <CreateFolha isOpen={modalOpen} closeModal={closeModal} handleSubmit={handleSubmit}/>

            
            {Array.isArray(item)&&(
                <View style={homeStyle.containerFolha}>
                    <ScrollView style={homeStyle.containerScroll}>
                        {Array.isArray(item) && item.map((item, index)=> (
                            <View key={index} style={homeStyle.containerDia}>
                                <View style={homeStyle.containerTxtDia}>
                                    <Text style={homeStyle.txtDia}>{item.dia}</Text>
                                </View>
                                <View style={homeStyle.containerValor}>
                                    <Text style={homeStyle.txtValor}>{item.valor}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

        </View>
    )
}

export default Home