import {View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { AddTreinoStyle } from '../styles/AddTreino/AddTreinoStyle'

const FormAddExercicio = ({closeModal, handleInput, handleSubmit, exercicio})=>{
    return(
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
    )
}
export default FormAddExercicio