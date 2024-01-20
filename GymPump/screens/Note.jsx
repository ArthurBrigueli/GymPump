import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRef} from 'react'
import CreateTreino from '../components/CreateTreino';
import { useState } from 'react';
import AddTreino from '../components/AddTreino';

const Note = ()=>{

    const modalRef = useRef(null)
    const modalRefAdd = useRef(null)
    const [openRef, setOpenRef] = useState(false)

    const openModalAdd = ()=>{
        modalRefAdd.current?.expand()
    }

    const closeModalAdd = ()=>{
        modalRefAdd.current?.close()
    }

    const openModal = ()=>{
        modalRef.current?.expand()
        setOpenRef(true)
    }

    const closeModal = ()=>{
        modalRef.current?.close()
        openModalAdd()
        setOpenRef(false)
    }



    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.btnAdd} onPress={openModal}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <CreateTreino modalRef={modalRef} closeModal={closeModal}/>

            <AddTreino openRef={modalRefAdd}/>
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