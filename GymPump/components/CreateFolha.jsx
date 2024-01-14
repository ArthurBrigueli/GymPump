import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from "react-native"
import FormFolha from "./FormFolha"

const CreateFolha = ({isOpen, closeModal})=>{


    return(
        <Modal visible={isOpen} animationType="slide">
            <View style={styles.container}>
                <TouchableOpacity onPress={closeModal} style={styles.botaoFechar}>
                    <Text style={styles.textBtnFechar}>↓</Text>
                </TouchableOpacity>
                
                <View style={styles.containerAddFolha}>
                    <ScrollView>
                        <FormFolha closeModal={closeModal}/>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#18192d',
    },

    botaoFechar: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#31346c',
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBtnFechar:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },

    containerAddFolha: {
        backgroundColor: 'white',
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 10
    }
})


export default CreateFolha