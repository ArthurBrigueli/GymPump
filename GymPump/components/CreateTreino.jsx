import {View, Text, TouchableOpacity, TextInput, Button, StyleSheet} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import {format} from 'date-fns'

const CreateTreino = ({modalRef, closeModal, setTitulo, titulo, setDate, date, addTreino})=>{


    const snapPoints = useMemo(()=>['30%'])
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

            <View style={styles.container}>

                <View style={styles.containerInputs}>
                    <View style={styles.containerDate}>
                        <TouchableOpacity style={styles.btnDate} onPress={()=>openDatePicker("date")}>
                            <Text>{format(date, 'dd/MM/yyyy')}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput placeholder='Digite o titulo do treino' style={styles.inputTitle} keyboardType='default' onChangeText={handleTitulo}/>
                    </View>
                </View>
                <View style={styles.containerbtn}>
                    <TouchableOpacity onPress={addTreino} style={styles.btnCriar}>
                        <Text style={styles.txtBtn}>Criar</Text>
                    </TouchableOpacity>
                </View>

                {openDate && (
                    <DateTimePicker
                        value={date}
                        is24Hour={true}
                        onChange={handleDate}
                        mode={mode}
                    />
                )}
            </View>

        </BottomSheet>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 20,
        alignItems :'center',
        flex: 1,
        justifyContent: 'space-around'
    },
    containerDate:{
        justifyContent: 'center',
        width: '100%'
    },
    btnDate: {
        width: '50%',
        padding: 10,
        alignItems:"center",
        marginLeft: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8
    },
    inputTitle: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        width: '50%',
    },
    containerInput: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    containerInputs:{
        width: '100%',
        gap: 20
    },
    containerbtn:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCriar: {
        backgroundColor: 'green',
        width: '50%',
        alignItems: 'center',
        borderRadius: 8,
        padding: 10
    },
    txtBtn:{
        color: 'white',
        fontWeight: 'bold'
    }
})


export default CreateTreino