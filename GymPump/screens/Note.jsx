import { StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRef} from 'react'
import CreateTreino from '../components/CreateTreino';
import { useState, useEffect } from 'react';
import AddTreino from '../components/AddTreino';

import { createTable, fetchTreinos, insertTreino, removeTable, deleteId } from '../databases/DataBase';
import useFetchTreino from '../hooks/useFetchTreino';

const Note = ()=>{

    const modalRef = useRef(null)
    const modalRefAdd = useRef(null)
    const [openRef, setOpenRef] = useState(false)
    const {addTreino:addTrinoDB, removeTreino, data, idTreino, update, json, removeTreinoId} = useFetchTreino(null)


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


    const addTreino = async()=>{

        addTrinoDB(titulo, date.toString())
        
        closeModal()
    }

    const addExercicios = (exercicios)=>{
        update(idTreino, exercicios)
    }


    const remove = ()=>{
        removeTreino()
    }

    const excluirExercicio = (id)=>{
        removeTreinoId(id)
    }

    return(
        <View style={styles.container}>

            <ScrollView>
                {Array.isArray(data) && data.map((e, index) => (
                    <View key={index} style={styles.containerTreino}>
                        <View>
                            <Text>{e.nome}</Text>
                            <Text>{e.data}</Text>
                        </View>
                        <View style={styles.containerExercicios}>
                            {Array.isArray(e.exercicios) && e.exercicios.map((exercicio, indexExercicios)=>(
                                <View key={indexExercicios} style={styles.containerExercicio}>
                                    <Text>{exercicio.nome}</Text>
                                    <Text>{exercicio.peso}</Text>
                                    <Text>{exercicio.repeticao}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.containerbtn}>
                            <TouchableOpacity style={styles.btnExcluir} onPress={()=>excluirExercicio(e.id)}>
                                <Text>x</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}  
            </ScrollView>

            


            <TouchableOpacity style={styles.btnAdd} onPress={openModal}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.remove} onPress={remove}>
                <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>
            

            <CreateTreino modalRef={modalRef} closeModal={closeModal} setTitulo={setTitulo} titulo={titulo} setDate={setDate} date={date} addTreino={addTreino}/>

            <AddTreino openRef={modalRefAdd} date={date} titulo={titulo} closeM={closeModalAdd} addExercicios={addExercicios}/>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1
    },

    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'gray'
    },

    containerbtn: {
        alignItems: 'flex-end',
    },

    btnExcluir: {
        backgroundColor: 'gray',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerExercicios: {
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10
    },

    containerTreino: {
        backgroundColor: 'white',
        padding: 10,
        gap: 20,
        margin: 15,
        borderRadius: 5
        
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