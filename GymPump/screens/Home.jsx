import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import CreateFolha from "../components/CreateFolha"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import { homeStyle } from "../styles/Home/Home";
import StatusProfile from "../components/StatusProfile/StatusProfile";
import useFetchFolha from "../hooks/useFetchFolha";

import { MaterialIcons } from '@expo/vector-icons';



const Home = () => {

    const [modalOpen, setIsModalOpen] = useState(false)
    const [dataFolha, setDataFolha] = useState([])
    const { add, data: item, remove: removeFolha } = useFetchFolha('FolhaDeTreino')

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const remove = async () => {
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


    const handleSubmit = async (data) => {
        add(data)
        closeModal()
        setDataFolha([])
    }

    return (
        <View style={homeStyle.container}>
            {!Array.isArray(item) ? (
                <View style={homeStyle.Containerbotao}>
                    <TouchableOpacity onPress={openModal} style={homeStyle.botao}>
                        <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity>
                    <MaterialIcons style={homeStyle.iconTip} name="subdirectory-arrow-right" size={60} color="#333863" />
                </View>
            ) : (
                <View style={homeStyle.Containerbotao}>
                    <TouchableOpacity style={homeStyle.botao} onPress={remove}>
                        <Ionicons name="trash" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            )}
            <CreateFolha isOpen={modalOpen} closeModal={closeModal} handleSubmit={handleSubmit} />

            <View style={homeStyle.containerStatusProfile}>
                <StatusProfile />
            </View>


            {Array.isArray(item) ? (
                <View style={homeStyle.containerFolha}>
                    <ScrollView style={homeStyle.containerScroll}>
                        {Array.isArray(item) && item.map((item, index) => (
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
            ):(
                <View>
                    <Text style={homeStyle.fichaTip}> Aqui você cria sua ficha de treino. </Text>
                </View>
            )}

        </View>


    )
}



export default Home