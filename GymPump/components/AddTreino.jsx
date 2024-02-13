import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, NumberInput} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { AddTreinoStyle } from '../styles/AddTreino/AddTreinoStyle';


const AddTreino = ({openRef, date, titulo, closeM, addExercicios})=>{

    const snapPoints = useMemo(()=>['20%', '50%', '100%'])

    const [openModel, setOpenModel] = useState(false)
    const [exercicios, setExercicios] = useState([])


    const [exercicio, setExercicio] = useState({
        nome: '',
        peso: '',
        repeticao: ''
    })

    


    const handleInput = (field, value) => {
        setExercicio((prevExercicio) => ({
            ...prevExercicio,
            [field]: value
        }))
    }

    const resetExercicio = () => {
        setExercicio({
          nome: '',
          peso: '',
          repeticao: ''
        });
    };


    const handleSubmit = ()=> {
        const cloneArray = [...exercicios]
        cloneArray.push(exercicio)
        setExercicios(cloneArray)
        setOpenModel(false)
        resetExercicio()
    }

    const addExercicio = ()=> {
        setOpenModel(true)
    }

    const saveExercicios = ()=>{
        addExercicios(exercicios)
        setExercicios([])
        closeM()
    }


    const closeModal = ()=> {
        setOpenModel(false)
    }

    const handleExcluir = (id)=>{
        const copia = [...exercicios]
        copia.splice(id, 1)
        setExercicios(copia)
    }

    return(
        <BottomSheet
            ref={openRef}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
        >

            <View style={AddTreinoStyle.containerInf}>
                <Text>{format(date, 'dd/MM/yyyy').toString()}</Text>
                <Text>{titulo}</Text>
            </View>

            <View style={AddTreinoStyle.containerExercicios}>
                {exercicios.map((e, index) => (
                    <View key={index} style={AddTreinoStyle.containerExercicio}>
                        <View style={AddTreinoStyle.containerBtnTrash}>
                            <TouchableOpacity style={AddTreinoStyle.btnExcluir} onPress={()=>{handleExcluir(index)}}>
                                <Ionicons name="trash" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={AddTreinoStyle.containerExercicioInfo}>
                            <Text style={AddTreinoStyle.Text}>{e.nome}</Text>
                            <View>
                                <Text style={AddTreinoStyle.Text}>{e.repeticao} REP</Text>
                                <Text style={AddTreinoStyle.Text}>{e.peso} KG</Text>
                            </View>
                        </View>
                    </View>
                ))}
                
            </View>

            <TouchableOpacity style={AddTreinoStyle.btnAdd} onPress={addExercicio}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={AddTreinoStyle.btnsave} onPress={saveExercicios}>
                <Ionicons name="save" size={20} color="white" />
            </TouchableOpacity>

            {openModel && (
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={AddTreinoStyle.BackContainerModal}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={AddTreinoStyle.containerModal}>
                                <View style={AddTreinoStyle.containerInputs}>
                                    <TextInput value={exercicio.nome} placeholder={'Nome do exercicio'} style={AddTreinoStyle.inputText} placeholderTextColor="white" onChangeText={(value) => handleInput('nome', value)}/>
                                    <TextInput value={exercicio.peso} keyboardType="numeric" placeholder={'Peso usado no exercicio'} placeholderTextColor="white" style={AddTreinoStyle.inputText} onChangeText={(value)=> handleInput('peso', value)}/>
                                    <TextInput value={exercicio.repeticao} keyboardType="numeric" placeholder={'Repetiçoes feitas'} placeholderTextColor="white"  style={AddTreinoStyle.inputText} onChangeText={(value)=> handleInput('repeticao', value)}/>
                                </View>
                                <TouchableOpacity style={AddTreinoStyle.addTreino} onPress={handleSubmit}>
                                    <Text>Adicionar exercicio</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
              </TouchableWithoutFeedback>
            )}

        </BottomSheet>
        
    )
}

export default AddTreino