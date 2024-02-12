import { useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Input, Button} from 'react-native-elements'
import { FormFolhaStyle } from '../styles/FormFolha/FormFolhaStyle'


const FormFolha = ({handleInputChange})=>{

    const diaSemana = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.']

    return(
        <View>
            {diaSemana.map((dia, index) => (
                <View key={index} style={FormFolhaStyle.inputContainer}>
                    <Text>{dia}</Text>
                    <Input
                        placeholder={`Digite algo para ${dia}`}
                        onChangeText={(value) => handleInputChange(index,dia, value)}
                        multiline
                    />
                </View>
            ))}
            
        </View>
    )
}


export default FormFolha