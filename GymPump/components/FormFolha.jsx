import { useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {Input, Button} from 'react-native-elements'



const FormFolha = ({handleInputChange})=>{

    const diaSemana = ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.']

    return(
        <View>
            {diaSemana.map((dia, index) => (
                <View key={index} style={styles.inputContainer}>
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


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: '100%',
    }
});


export default FormFolha