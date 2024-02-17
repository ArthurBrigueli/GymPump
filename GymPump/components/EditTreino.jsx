import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TouchableWithoutFeedback} from "react-native"
import BottomSheet from '@gorhom/bottom-sheet'
import { useEffect, useMemo, useRef, useState } from "react"
import { Icon } from "react-native-elements"
import { AddTreinoStyle } from "../styles/AddTreino/AddTreinoStyle"

const EditTreino = ({modalRefEdit, closeModal, data:dataEdit, loading, editTreino})=>{

    const snapPoint = useMemo(()=>['100%'])

    const [data, setData] = useState(dataEdit)
    const [openModal, setOpenModal] = useState(false)
    const [newExercicio, setNewExercicio] = useState({
        nome: "",
        peso: "",
        repeticao: ""
    })


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
        editTreino(data[0].id, data[0].nome, data[0].data, data[0].exercicios)
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
        setNewExercicio({
            [index]: value
        })


    }

    const handleSubmit = ()=> {
        const prev = [...data[0].exercicios]
        prev.push(newExercicio)
        data[0].exercicios = prev
        setNewExercicio({
            nome: "",
            peso: "",
            repeticao: ""
        })
        setOpenModal(false)
    }


    


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
                        <View key={index} style={styles.containerEdit}>
                            <View style={styles.containerInfo}>
                                <TextInput value={e.nome} style={styles.inputNome} onChangeText={(e)=>handleData(index, 'nome', e)}/>
                                <TextInput style={styles.input} value={e.data} onChangeText={(e)=>handleData(index,'data', e)}/>
                            </View>
                            <View style={styles.containerExercicios}>
                                {Array.isArray(e.exercicios) && e.exercicios.map((ex, indexEx)=>(
                                    <View key={indexEx} style={styles.containerExercicio}>
                                        <TextInput value={ex.nome} style={styles.inputExercicio} onChangeText={(e)=>{handleExercicios(indexEx, 'nome', e)}}/>
                                        <View style={styles.containerInfo}>
                                            <TextInput style={styles.inputExercicio} value={ex.peso} onChangeText={(e)=>{handleExercicios(indexEx, 'peso', e)}}/>
                                            <TextInput style={styles.inputExercicio} value={ex.repeticao} onChangeText={(e)=>{handleExercicios(indexEx, 'repeticao', e)}}/>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))
                ):(
                    <ActivityIndicator size='large' color='black'/>
                )}
                


                <View>
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


                {openModal && (
                    <TouchableWithoutFeedback onPress={closeOpenModal}>
                        <View style={AddTreinoStyle.BackContainerModal}>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <View style={AddTreinoStyle.containerModal}>
                                    <View style={AddTreinoStyle.containerInputs}>
                                        <TextInput value={newExercicio.nome} placeholder={'Nome do exercicio'} style={AddTreinoStyle.inputText} placeholderTextColor="white" onChangeText={(value) => handleInput('nome', value)}/>
                                        <TextInput value={newExercicio.peso} keyboardType="numeric" placeholder={'Peso usado no exercicio'} placeholderTextColor="white" style={AddTreinoStyle.inputText} onChangeText={(value)=> handleInput('peso', value)}/>
                                        <TextInput value={newExercicio.repeticao} keyboardType="numeric" placeholder={'Repetiçoes feitas'} placeholderTextColor="white"  style={AddTreinoStyle.inputText} onChangeText={(value)=> handleInput('repeticao', value)}/>
                                    </View>
                                    <TouchableOpacity style={AddTreinoStyle.addTreino} onPress={handleSubmit}>
                                        <Text>Adicionar exercicio</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
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
    container:{
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-between',
    },
    containerEdit: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 15,
        gap: 15
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

    btnteste: {
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
    containerExercicio: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 3
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
        color: 'white',
        borderColor: 'white',
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