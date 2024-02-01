import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput, NumberInput} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';


const AddTreino = ({openRef, date, titulo})=>{

    const snapPoints = useMemo(()=>['20%', '50%', '100%'])

    const [openModel, setOpenModel] = useState(false)
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


    const handleSubmit = ()=> {
        console.log(exercicio)
    }

    const addExercicio = ()=> {
        setOpenModel(true)
    }


    const closeModal = ()=> {
        setOpenModel(false)
    }

    return(
        <BottomSheet
            ref={openRef}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
        >

            <View style={styles.containerInf}>
                <Text>{format(date, 'dd/MM/yyyy').toString()}</Text>
                <Text>{titulo}</Text>
            </View>

            <View style={styles.containerExercicios}>
                <View style={styles.containerExercicio}>
                    <Text style={styles.Text}>Nome do exercicio</Text>
                    <View>
                        <Text style={styles.Text}>4Rep</Text>
                        <Text style={styles.Text}>25KG</Text>
                    </View>
                </View>
                
            </View>
            <TouchableOpacity style={styles.btnAdd} onPress={addExercicio}>
                <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>

            {openModel && (
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.BackContainerModal}>
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.containerModal}>
                                <View style={styles.containerInputs}>
                                    <TextInput value={exercicio.nome} placeholder={'Nome do exercicio'} style={styles.inputText} placeholderTextColor="white" onChangeText={(value) => handleInput('nome', value)}/>
                                    <TextInput value={exercicio.peso} keyboardType="numeric" placeholder={'Peso usado no exercicio'} placeholderTextColor="white" style={styles.inputText} onChangeText={(value)=> handleInput('peso', value)}/>
                                    <TextInput value={exercicio.repeticao} keyboardType="numeric" placeholder={'Repetiçoes feitas'} placeholderTextColor="white"  style={styles.inputText} onChangeText={(value)=> handleInput('repeticao', value)}/>
                                </View>
                                <TouchableOpacity onPress={handleSubmit}>
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



const styles = StyleSheet.create({
    containerInf: {
        alignItems: 'center',
        padding: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 20

    },
    containerExercicios: {
        
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
    },
    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight:25,
        padding: 10,
        backgroundColor: 'gray',
        margin: 10
    },
    Text: {
        color: 'white'
    },
    BackContainerModal: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    containerModal: {
        backgroundColor: 'gray',
        width: '70%',
        padding: 30,
        alignItems: 'center',
        justifyContent:"space-around",
        borderRadius: 10,
        gap:30
    },
    containerInputs: {
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',
        gap: 15
    },
    inputText: {
        borderColor: 'black',
        borderWidth:1,
        borderRadius:5,
        width: '90%',
        color: 'white',
        paddingLeft: 10
    }
})

export default AddTreino