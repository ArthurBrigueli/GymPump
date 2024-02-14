import { View, Text, TouchableWithoutFeedback } from "react-native"
import { StyleSheet } from "react-native"
import style from '../styles/PopUpTxtLimited/style'

const PopUpTxtLimited = ({txt, handleTxtLimited})=>{
    return(
        
        <TouchableWithoutFeedback onPress={()=>handleTxtLimited(null)}>
            <View style={style.container}>
                <Text style={style.txt}>{txt}</Text>
            </View>
        </TouchableWithoutFeedback>
            
        
    )
}



export default PopUpTxtLimited