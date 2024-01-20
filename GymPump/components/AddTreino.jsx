import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import { format } from 'date-fns'


const AddTreino = ({openRef, date, titulo})=>{

    const snapPoints = useMemo(()=>['20%', '50%', '100%'])

    return(
        <BottomSheet
            ref={openRef}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
        >

            <Text>data: {format(date, 'dd/MM/yyyy').toString()}</Text>
            <Text>titulo: {titulo}</Text>

        </BottomSheet>
    )
}



const styles = StyleSheet.create({

})

export default AddTreino