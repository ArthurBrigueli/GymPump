import {View, Text, TouchableOpacity, TextInput, Button, StyleSheet} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import {format} from 'date-fns'
import { CreateTreinoStyle } from '../styles/CreateTreino/CreateTreinoStyle'

const CreateTreino = ({modalRef, closeModal, setTitulo, titulo, setDate, date, addTreino})=>{


    const snapPoints = useMemo(()=>['40%'])
    const [openDate, setOpenDate] = useState(false)
    const [mode, setMode] = useState("date")


    const handleDate = (e, selectDate)=>{
        setDate(selectDate)
        setOpenDate(false)
    }
     
    const handleTitulo = (e)=>{
        setTitulo(e)
    }


    const openDatePicker = (showMode)=>{
        setOpenDate(true)
        setMode(showMode)
    }


    return(
        <BottomSheet
            ref={modalRef}
            snapPoints={snapPoints}
            index={-1}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >

            <View style={CreateTreinoStyle.container}>

                <View style={CreateTreinoStyle.containerInputs}>
                    <View style={CreateTreinoStyle.containerDate}>
                        <TouchableOpacity style={CreateTreinoStyle.btnDate} onPress={()=>openDatePicker("date")}>
                            <Text>{format(date, 'dd/MM/yyyy')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={CreateTreinoStyle.containerInput}>
                        <TextInput placeholder='Digite o titulo do treino' style={CreateTreinoStyle.inputTitle} keyboardType='default' onChangeText={handleTitulo}/>
                    </View>
                </View>
                <View style={CreateTreinoStyle.containerbtn}>
                    <TouchableOpacity onPress={addTreino} style={CreateTreinoStyle.btnCriar}>
                        <Text style={CreateTreinoStyle.txtBtn}>Criar</Text>
                    </TouchableOpacity>
                </View>

                {openDate && (
                    <DateTimePicker
                        value={date}
                        is24Hour={true}
                        onChange={handleDate}
                        mode={mode}
                        display='spinner'
                    />
                )}
            </View>

        </BottomSheet>
    )
}


export default CreateTreino