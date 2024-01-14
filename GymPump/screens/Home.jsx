import { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"
import CreateFolha from "../components/CreateFolha"


const Home = ()=>{

    const [modalOpen, setIsModalOpen] = useState(false)

    const openModal = ()=>{
        setIsModalOpen(true)
    }

    const closeModal = ()=>{
        setIsModalOpen(false)
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.botao} onPress={openModal}>
                <Text style={styles.txtBotaoAddFolha}>Adicionar folha de treino</Text>
            </TouchableOpacity>


            <CreateFolha isOpen={modalOpen} closeModal={closeModal}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1
    },
    botao:{
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        margin: 20,
        padding: 5,
        borderRadius: 10
    },
    txtBotaoAddFolha: {
        color: 'white'
    }
})

export default Home