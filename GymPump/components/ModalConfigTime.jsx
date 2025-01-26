import {View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useMemo, useState } from "react"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import Separator from "./Separator"
import { ModalConfigTimeStyle } from "../styles/ModalConfigTime/ModalConfigTimeStyle"

const ModalConfigTime = ({ bottomSheetRef , alterarTime})=>{

    const snapPoint = useMemo(()=>['40%'])

    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [selectedSeconds, setSelectedSeconds] = useState(0);

    

    return(
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoint}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >

            <BottomSheetView style={ModalConfigTimeStyle.container}>
            <View style={ModalConfigTimeStyle.pickerContainer}>
                    <View style={ModalConfigTimeStyle.containerTextTitle}>
                        <Text>Minutos</Text>
                    </View>
                    <Picker
                        selectedValue={selectedMinutes}
                        onValueChange={(itemValue) => setSelectedMinutes(itemValue)}
                        
                    >
                    
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <Picker.Item key={minute} label={String(minute).padStart(2)} value={String(minute).padStart(2)} />
                    ))}
                    </Picker>
                    <Separator color="black" heigth={1}/>
                    <View style={ModalConfigTimeStyle.containerTextTitle}>
                        <Text>Segundos</Text>
                    </View>
                    <Picker
                        selectedValue={selectedSeconds}
                        onValueChange={(itemValue) => setSelectedSeconds(itemValue)}
                    >
                    {Array.from({ length: 60 }, (_, i) => i).map((second) => (
                        <Picker.Item key={second} label={String(second).padStart(2)} value={String(second).padStart(2)} />
                    ))}
                    </Picker>
                </View>
                <View style={ModalConfigTimeStyle.containerBtnSalvar}>
                    <TouchableOpacity style={ModalConfigTimeStyle.saveButton} onPress={()=>alterarTime(selectedMinutes, selectedSeconds)}>
                        <Text style={ModalConfigTimeStyle.txtBtn}>Alterar</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetView>
        </BottomSheet>

        
    )
}




export default ModalConfigTime