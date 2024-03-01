import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput } from "react-native-gesture-handler"

const ForgotPassword = ()=>{


    const [email, setEmail] = useState('')

    const handleForgotPass = ()=>{
        console.log(email)
    }

    return(
        <View style={styles.container}>
            <View>
                <TextInput placeholder="Digite seu email" onChangeText={(e)=>setEmail(e)}/>
            </View>
            <View>
                <TouchableOpacity onPress={handleForgotPass}>
                    <Text>Trocar senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        flex: 1
    },
})

export default ForgotPassword