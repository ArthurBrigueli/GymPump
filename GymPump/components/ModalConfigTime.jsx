import {View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { useState } from "react"

const ModalConfigTime = ({isConfigOpen, closeConfig})=>{


    

    return(
        <Modal visible={isConfigOpen} animationType="slide">
            <Text>Configuração</Text>
            <TouchableOpacity onPress={closeConfig}>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </Modal>
    )
}



const styles = StyleSheet.create({
    
})

export default ModalConfigTime