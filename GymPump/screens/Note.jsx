import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRef} from 'react'
import CreateTreino from '../components/CreateTreino';
import { useState, useEffect } from 'react';
import AddTreino from '../components/AddTreino';

import { createTable, fetchTreinos, insertTreino, removeTable } from '../databases/DataBase';

const Note = ()=>{

    const modalRef = useRef(null)
    const modalRefAdd = useRef(null)
    const [openRef, setOpenRef] = useState(false)


    {/* state das info do treino */}
    const [date, setDate] = useState(new Date())
    const [titulo, setTitulo] = useState('')

    const [exercicios, setExercicios] = useState([])


    useEffect(() => {
        createTable();
        fetchTreinos(setExercicios);
    }, [exercicios]);

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


    const addTreino = ()=>{
        insertTreino(titulo, date.toString())
        fetchTreinos(setExercicios);
        closeModal()
    }


    const remove = ()=>{
        removeTable()
    }


    return(
        <View style={styles.container}>

            {exercicios.map((e, index)=> (
                <Text style={styles.txt} key={index}>{e.nome} - {e.data} - {e.exercicios}</Text>
            ))}


            <TouchableOpacity style={styles.btnAdd} onPress={openModal}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.remove} onPress={remove}>
                <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
            

            <CreateTreino modalRef={modalRef} closeModal={closeModal} setTitulo={setTitulo} titulo={titulo} setDate={setDate} date={date} addTreino={addTreino}/>

            <AddTreino openRef={modalRefAdd} date={date} titulo={titulo} closeM={closeModalAdd}/>
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
        zIndex: 0
    },
    remove: {
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 90,
        right: 20,
        zIndex: 0
    }
})

export default Note