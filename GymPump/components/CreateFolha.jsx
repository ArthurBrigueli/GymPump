    import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from "react-native"
    import FormFolha from "./FormFolha"
    import { useState } from "react"
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useEffect } from "react";
    import { CreateFolhaStyle } from "../styles/CreateFolha/CreateFolhaStyle";

    const CreateFolha = ({isOpen, closeModal, handleSubmit})=>{


        const [dataFolha, setDataFolha] = useState([])

        const handleInputChange = (index, dia, valor) => {
            const novoArray = [...dataFolha];
            novoArray[index] = { dia, valor };
            setDataFolha(novoArray);
            novoArray.map((item, index)=> (
                item == undefined && (
                    novoArray[index] = {}
                )
            ))
            
        };


        const handleSu = ()=>{
            handleSubmit(dataFolha)
        }



        return(
            <Modal visible={isOpen} animationType="slide">
                <View style={CreateFolhaStyle.container}>
                    <TouchableOpacity onPress={closeModal} style={CreateFolhaStyle.botaoFechar}>
                        <Text style={CreateFolhaStyle.textBtnFechar}>↓</Text>
                    </TouchableOpacity>
                    
                    <View style={CreateFolhaStyle.containerAddFolha}>
                        <ScrollView>
                            <FormFolha handleInputChange={handleInputChange}/>
                            <TouchableOpacity style={CreateFolhaStyle.btnSubmit} onPress={handleSu}>
                                <Text style={CreateFolhaStyle.txtBtn}>Criar folha de treino</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }



    export default CreateFolha