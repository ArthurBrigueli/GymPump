import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import BottomSheet from '@gorhom/bottom-sheet'
import { useMemo } from "react"
import { Icon } from "react-native-elements"

const EditTreino = ({modalRefEdit, closeModal, data, loading})=>{

    const snapPoint = useMemo(()=>['100%'])

    return(
        <BottomSheet
            snapPoints={snapPoint}
            ref={modalRefEdit}
            index={-1}
            backgroundStyle={{backgroundColor: 'white'}}
            enablePanDownToClose={true}
        >
            {!loading ? (
                data && data.map((e, index)=>(
                    <View key={index}>
                        <Text key={index}>{e.nome}-{e.data}</Text>
                        {Array.isArray(e.exercicios) && e.exercicios.map((ex, indexEx)=>(
                            <Text key={indexEx}>{ex.nome}-{ex.peso}-{ex.repeticao}</Text>
                        ))}
                    </View>
                ))
            ):(
                <ActivityIndicator size='large' color='black'/>
            )}
            


            <TouchableOpacity style={styles.btnEdit}>
                {!loading ? (
                    <Icon name="edit" color='black'/>
                ):(
                    <ActivityIndicator size='small' color='black'/>
                )}
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