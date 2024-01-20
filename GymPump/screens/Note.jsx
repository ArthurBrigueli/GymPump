import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRef} from 'react'
import CreateTreino from '../components/CreateTreino';
import { useState } from 'react';

const Note = ()=>{

    const modalRef = useRef(null)

    const openModal = ()=>{
        modalRef.current?.expand()
    }

    const closeModal = ()=>{
        modalRef.current?.close()
    }



    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnAdd} onPress={openModal}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <CreateTreino modalRef={modalRef} closeModal={closeModal}/>

            <Text style={styles.txt}>sjajsaj</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
    },

    txt: {
        color: 'white'
    },
    btnAdd: {
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
    }
})

export default Note