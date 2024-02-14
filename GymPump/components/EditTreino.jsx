import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from "react"
import { Icon } from "react-native-elements"


const EditTreino = ({modalRefEdit, closeModal, data})=>{

    const snapPoint = useMemo(()=>['100%'])

    return(
        <BottomSheet
            snapPoints={snapPoint}
            ref={modalRefEdit}
            index={-1}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >
            {data && data.map((e, index)=>(
                <View>
                    <Text key={index}>{e.nome}-{e.data}</Text>
                    {Array.isArray(e.exercicios) && e.exercicios.map((ex, indexEx)=>(
                        <Text key={indexEx}>{ex.nome}-{ex.peso}-{ex.repeticao}</Text>
                    ))}
                </View>
            ))}


            <TouchableOpacity style={styles.btnEdit}>
                <Icon name="edit" color='black'/>
            </TouchableOpacity>
            
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    btnEdit: {
        backgroundColor: 'red'
    }
})


export default EditTreino