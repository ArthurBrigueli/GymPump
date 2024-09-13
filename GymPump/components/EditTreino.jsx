import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TouchableWithoutFeedback, ScrollView} from "react-native"
import BottomSheet from '@gorhom/bottom-sheet'
import { useEffect, useMemo, useRef, useState } from "react"
import { Icon } from "react-native-elements"
import { AddTreinoStyle } from "../styles/AddTreino/AddTreinoStyle"
import FormAddExercicio from "./FormAddExercicio"

const EditTreino = ({modalRefEdit, closeModal, data:dataEdit, loading, editTreino})=>{

    const snapPoint = useMemo(()=>['100%'])

    const [data, setData] = useState(dataEdit)
    const [openModal, setOpenModal] = useState(false)
    const [newExercicio, setNewExercicio] = useState({
        name: "",
        peso: "",
        repeticao: ""
    })

    const [showButtom, setShowButton] = useState(true)


    useEffect(()=>{
        setData(dataEdit)
    },[dataEdit])


    const handleData = (index, name, value)=>{
        const prev = [...data]
        prev[index][name] = value
        setData(prev)
    }

    const handleExercicios = (indexE, nameE, value)=>{
        const prev = [...data]
        prev[0]['exercicios'][indexE][nameE] = value
        setData(prev)
    }


    const edit = ()=>{
        editTreino(data[0].id, data[0].name, data[0].date, data[0].exercicios)
        closeModal()
        Alert.alert('Treino editado', 'Seu treino foi editado com sucesso!')
    }


    const addTreino = ()=>{
        setOpenModal(true)
    }

    const closeOpenModal = ()=> {
        setOpenModal(false)
    }

    const handleInput = (index, value)=>{
        const prev = {...newExercicio}
        prev[index] = value
        setNewExercicio(prev)
    }

    const handleSubmit = ()=> {
        const prev = [...data[0].exercicios]
        prev.push(newExercicio)
        data[0].exercicios = prev
        setNewExercicio({
            name: "",
            peso: "",
            repeticao: ""
        })
        setOpenModal(false)
    }

    const handleSubmitClear = (index)=>{
        const prev = [...data]
        prev[0].exercicios.splice(index, 1)
        setData(prev)
    }

    const handleTest = (event) => {
        const { contentOffset } = event.nativeEvent;
        if(contentOffset.y > 0){
            setShowButton(false)
        }else{
            setShowButton(true)
        }
      };


    return(
        <BottomSheet
            snapPoints={snapPoint}
            ref={modalRefEdit}
            index={-1}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >
            <View style={styles.container}>
                {!loading ? (
                    data && data.map((e, index)=>(
                        <ScrollView key={index}  onScroll={handleTest}>
                            <View style={styles.containerEdit}>
                                <View style={styles.containerInfo}>
                                    <TextInput value={e.name} style={styles.inputNome} onChangeText={(e)=>handleData(index, 'name', e)}/>
                                    <TextInput style={styles.input} value={e.date} onChangeText={(e)=>handleData(index,'date', e)}/>
                                </View>
                                <View style={styles.containerExercicios}>
                                    {Array.isArray(e.exercicios) && e.exercicios.map((ex, indexEx)=>(
                                        <View key={indexEx} style={styles.containerExercicio}>
                                            <View style={styles.containerBtnDelete}>
                                                <TouchableOpacity onPress={()=>handleSubmitClear(indexEx)}>
                                                <Icon name="delete" color='black'/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.containerInfoExercicio}>
                                                <TextInput value={ex.name} style={styles.inputExercicio} onChangeText={(e)=>{handleExercicios(indexEx, 'name', e)}}/>
                                                <View style={styles.containerInfo}>
                                                    <TextInput style={styles.inputExercicio} value={ex.peso} onChangeText={(e)=>{handleExercicios(indexEx, 'peso', e)}}/>
                                                    <TextInput style={styles.inputExercicio} value={ex.repeticao} onChangeText={(e)=>{handleExercicios(indexEx, 'repeticao', e)}}/>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    ))
                ):(
                    <ActivityIndicator size='large' color='black'/>
                )}
                


                {showButtom && (
                    <View style={styles.containerBtn}>
                        <TouchableOpacity style={styles.btnEdit}>
                            {!loading ? (
                                <Icon name="save" color='white' onPress={edit}/>
                            ):(
                                <ActivityIndicator size='small' color='white'/>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnteste}>
                            {!loading ? (
                                <Icon name="add" color='white' onPress={addTreino}/>
                            ):(
                                <ActivityIndicator size='small' color='white'/>
                            )}
                        </TouchableOpacity>
                    </View>
                )}


                {openModal && (
                    <FormAddExercicio closeModal={closeOpenModal} handleSubmit={handleSubmit} handleInput={handleInput} exercicio={newExercicio}/>
                )}

            </View>
            
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    btnEdit: {
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

    btnteste: {
        backgroundColor: '#18192d',
        justifyContent:'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 100,
        position: 'absolute',
        bottom: 20,
        right: 90,
        zIndex: 0
    },

    btnAdd: {
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
    },

    containerBtnDelete: {
        width: "100%",
        alignItems: 'flex-end'
    },
    container:{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
    },
    containerInfoExercicio:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#d5def5',
        padding: 10,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1
    },
    containerEdit: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 15,
        gap: 15
    },

    containerExercicio: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#d5def5',
        padding: 10,
        borderRadius: 3,
        borderColor: 'black',
        borderWidth: 1
    },
    containerExercicios: {
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10
    },
    inputNome: {
        fontSize: 20,
        fontWeight: 'bold',
        borderColor: 'black',
        borderBottomWidth: 1,
    },
    inputExercicio:{
        color: 'black',
        borderColor: 'black',
        borderBottomWidth: 1,

    },
    input:{
        borderColor: 'black',
        borderBottomWidth: 1,
    },
    containerInfo: {
        gap: 10
    }

})


export default EditTreino