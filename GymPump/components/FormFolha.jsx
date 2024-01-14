import { useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Input, Button} from 'react-native-elements'


const FormFolha = ({closeModal})=>{
    
    const diaSemana = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.']
    const [input, setInput] = useState()


    const handleInputChange = (dia, value)=>{
        setInput({...input, [dia]:value})
    }



    const handleSubmit = ()=>{
        console.log(input)
        closeModal()
    }

    return(
        <View>
            {diaSemana.map((dia, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text>{dia}</Text>
                    <Input
                        placeholder={`Digite algo para ${dia}`}
                        onChangeText={(value) => handleInputChange(dia, value)}
                        multiline
                    />
                </View>
            ))}
            
            <TouchableOpacity style={styles.btnSubmit} onPress={handleSubmit}>
                <Text style={styles.txtBtn}>Criar folha de treino</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: '100%',
    },

    btnSubmit: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#18192d'
    },

    txtBtn: {
        color: 'white'
    }
});


export default FormFolha