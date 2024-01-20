import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from 'react'


const AddTreino = ({openRef})=>{

    const snapPoints = useMemo(()=>['20%', '50%', '100%'])

    return(
        <BottomSheet
            ref={openRef}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
        >

            <Text>Agora voce tera que adicionar seus treinos</Text>

        </BottomSheet>
    )
}



const styles = StyleSheet.create({

})

export default AddTreino