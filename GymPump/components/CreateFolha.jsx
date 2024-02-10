    import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from "react-native"
    import FormFolha from "./FormFolha"
    import { useState } from "react"
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { useEffect } from "react";

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
                <View style={styles.container}>
                    <TouchableOpacity onPress={closeModal} style={styles.botaoFechar}>
                        <Text style={styles.textBtnFechar}>↓</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.containerAddFolha}>
                        <ScrollView>
                            <FormFolha handleInputChange={handleInputChange}/>
                            <TouchableOpacity style={styles.btnSubmit} onPress={handleSu}>
                                <Text style={styles.txtBtn}>Criar folha de treino</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#18192d',
        },

        botaoFechar: {
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#31346c',
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
        },

        textBtnFechar:{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 30
        },

        containerAddFolha: {
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10
        },
        btnSubmit: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#18192d'
        },

        txtBtn: {
            color: 'white'
        }
    })


    export default CreateFolha