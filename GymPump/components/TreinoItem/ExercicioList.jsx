import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { useState } from 'react'
import { noteStyle } from '../../styles/Note/noteStyle'

const ExercicioList = ({exercicios, limitarText})=>{


    return(
        <View style={noteStyle.containerExercicio}>
            <Text style={noteStyle.txtNomeExercicio}>{limitarText(exercicios.name, 30)}</Text>
            <View>
                <Text style={noteStyle.txt}>{exercicios.peso}KG</Text>
                <Text style={noteStyle.txt}>{exercicios.repeticao}Rep</Text>
            </View>
        </View>
    )   
}


export default ExercicioList