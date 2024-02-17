import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useRef} from 'react'
import CreateTreino from '../components/CreateTreino';
import { useState, useEffect } from 'react';
import AddTreino from '../components/AddTreino';
import {format} from 'date-fns'
import { createTable, fetchTreinos, insertTreino, removeTable, deleteId } from '../databases/DataBase';
import useFetchTreino from '../hooks/useFetchTreino';
import { noteStyle } from '../styles/Note/noteStyle';
import { Icon } from 'react-native-elements';
import EditTreino from '../components/EditTreino';
import PopUpTxtLimited from '../components/PopUpTxtLimited';

const Note = ()=>{

    const modalRef = useRef(null)
    const modalRefAdd = useRef(null)
    const modalRefEdit = useRef(null)

    const [openRef, setOpenRef] = useState(false)
    const {addTreino:addTrinoDB, removeTreino, data, idTreino, update, json, removeTreinoId, fetchIdTreino, dataId, loadingEdit, loading, updateTreinoId} = useFetchTreino(null)

    
    {/* state das info do treino */}
    const [date, setDate] = useState(new Date())
    const [titulo, setTitulo] = useState('')
    const [exercicios, setExercicios] = useState([])
    const [btnLoading, setBtnLoading] = useState(null)
    const [clickedTxt, setclickedTxt] = useState(false)


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

    const openModalEdit = (id)=>{
        fetchIdTreino(id)
        modalRefEdit.current?.expand();
    }

    const closeModalEdit = ()=>{
        modalRefEdit.current?.close()
    }


    const addTreino = async()=>{

        addTrinoDB(titulo, date.toString())
        
        closeModal()
    }

    const addExercicios = (exercicios)=>{
        update(idTreino, exercicios)
    }


    const editTreino = (id, nome, data, exercicios)=>{
        updateTreinoId(id, nome, data, exercicios)

    }


    const remove = ()=>{
        removeTreino()
    }
    

    const excluirExercicio = (id)=>{
        removeTreinoId(id)
    }

    const handleTxtLimited = (index, indexExercicios)=>{
        setclickedTxt([index, indexExercicios])
    }


    const limitarString = (string, tam)=>{
        if(string.length > tam){
            return string.substring(0, tam) + '...'
        }else{
            return string
        }
    }

    return(
        <View style={noteStyle.container}>

            <ScrollView>
                {Array.isArray(data) && data.map((e, index) => (
                    <View key={index} style={noteStyle.containerTreino}>
                        <View>
                            <Text style={noteStyle.txtNome}>{e.nome}</Text>
                            <Text>{e.data}</Text>
                        </View>
                        <View style={noteStyle.containerExercicios}>
                            {Array.isArray(e.exercicios) && e.exercicios.map((exercicio, indexExercicios)=>(
                                <View key={indexExercicios} style={noteStyle.containerExercicio}>
                                    <Text style={noteStyle.txt} onPress={()=>handleTxtLimited(index, indexExercicios)}>{limitarString(exercicio.nome, 30)}</Text>
                                    {clickedTxt[0] == index && clickedTxt[1] == indexExercicios && (
                                        <PopUpTxtLimited txt={exercicio.nome} handleTxtLimited={handleTxtLimited}/>
                                    )}

                                    <View>
                                        <Text style={noteStyle.txt}>{exercicio.peso}KG</Text>
                                        <Text style={noteStyle.txt}>{exercicio.repeticao}Rep</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        {loading ? (
                            <ActivityIndicator size='small' color='black'/>
                        ):(
                            <View style={noteStyle.containerbtn}>
                                <TouchableOpacity style={noteStyle.btnEdit} onPress={()=>{openModalEdit(e.id)}} disabled={loadingEdit}>
                                    {loadingEdit ? (
                                        <ActivityIndicator size='small' color='black' />
                                    ):(
                                        <Icon name='edit' color='black'/>
                                    )}
                                </TouchableOpacity>
                                <TouchableOpacity style={noteStyle.btnExcluir} onPress={()=>excluirExercicio(e.id)} disabled={loading}>
                                    {loading ? (
                                        <ActivityIndicator size='small' color='white'/>
                                    ): (
                                        <Icon name='clear' color='white'/>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}  
            </ScrollView>

            


            <TouchableOpacity style={noteStyle.btnAdd} onPress={openModal}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={noteStyle.remove} onPress={remove}>
                <Ionicons name="remove" size={20} color="white" />
            </TouchableOpacity>


            <EditTreino modalRefEdit={modalRefEdit} closeModal={closeModalEdit} data={dataId} loading={loadingEdit} editTreino={editTreino}/>

            <CreateTreino modalRef={modalRef} closeModal={closeModal} setTitulo={setTitulo} titulo={titulo} setDate={setDate} date={date} addTreino={addTreino}/>

            <AddTreino openRef={modalRefAdd} date={date} titulo={titulo} closeM={closeModalAdd} addExercicios={addExercicios}/>
        </View>
    )
}

export default Note