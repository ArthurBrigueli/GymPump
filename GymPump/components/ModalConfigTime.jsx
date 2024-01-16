import {View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useMemo, useState } from "react"
import BottomSheet from "@gorhom/bottom-sheet"

const ModalConfigTime = ({ bottomSheetRef , alterarTime})=>{

    const snapPoint = useMemo(()=>['40%'])

    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);

    

    return(
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoint}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >

            <View style={styles.container}>
                <View style={styles.pickerContainer}>
                    <Picker
                    selectedValue={selectedMinutes}
                    onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                    >
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <Picker.Item key={minute} label={String(minute).padStart(2)} value={String(minute).padStart(2)} />
                    ))}
                    </Picker>
                    <Text>:</Text>
                    <Picker
                    selectedValue={selectedSeconds}
                    onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
                    >
                    {Array.from({ length: 60 }, (_, i) => i).map((second) => (
                        <Picker.Item key={second} label={String(second).padStart(2)} value={String(second).padStart(2)} />
                    ))}
                    </Picker>
                </View>
                <View style={styles.containerBtnSalvar}>
                    <TouchableOpacity style={styles.saveButton} onPress={()=>alterarTime(selectedMinutes, selectedSeconds)}>
                        <Text style={styles.txtBtn}>Alterar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>

        
    )
}



const styles = StyleSheet.create({
    containerBtnSalvar:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#c2c2c2',
        padding: 10,
        borderRadius: 100,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        justifyContent: 'space-around'
    },
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    txtBtn:{
        color: 'black',
        fontWeight: 'bold'
    }
})

export default ModalConfigTime