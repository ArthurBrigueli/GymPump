import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import TutorialFicha from "../components/TutorialAppFirstUser/TutorialFicha";
import TutorialNote from "../components/TutorialAppFirstUser/TutorialNote";
import TutorialTimer from "../components/TutorialAppFirstUser/TutorialTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TutorialUser = ({navigation})=>{


    const [fineshTutoria, setFineshTutorial] = useState(false)

    const [currentStep, setCurrentStep] = useState(0);


    const componentsTutorial = [<TutorialFicha key={0}/>, <TutorialNote key={1}/>, <TutorialTimer key={2}/>]


    useEffect(()=>{
        const a = ()=>{
            if(currentStep == 2){
                setFineshTutorial(true)
            }
        }

        a()
    }, [currentStep])

    const handleNextPassTutorial = ()=>{
        setCurrentStep((prevStep) => {
            if (prevStep < 2) {
              return prevStep + 1;
            }
            return prevStep;
          });
    }

    const handleConcluir = async()=>{
        await AsyncStorage.setItem("TutorialNewUser", "true")
        navigation.navigate("MainTabs", "Home")
    }


    return(
        <View style={styles.container}>
            <View style={styles.containerInfo}>

                {componentsTutorial[currentStep]}
                
            </View>
            <View style={styles.containerBtns}>
                
                {!fineshTutoria ? (
                    <View style={styles.containerBtns}>
                        <TouchableOpacity onPress={handleConcluir}>
                            <Text style={styles.txt}>SKIP</Text>
                        </TouchableOpacity>
                        <View style={styles.containerDots}>
                            {[0, 1, 2].map((step, key) => (
                                <View key={key} style={[styles.dots, { backgroundColor: currentStep === step ? '#31346c' : '#ccc' } ]}>

                                </View>
                            ))}
                        </View>
                        <TouchableOpacity onPress={handleNextPassTutorial}>
                            <Text style={styles.txt}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                ): (
                    <View style={styles.containerBtns}>
                        <TouchableOpacity onPress={handleConcluir}>
                            <Text style={styles.txt}>CONCLUIR</Text>
                        </TouchableOpacity>
                    </View>
                )}
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 10
    },
    containerBtns: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20,
        justifyContent: 'space-around'
    },

    txtTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    },
    txtDesc: {
        color: 'white',
        textAlign: 'center',
        fontSize: 25
    },
    txt: {
        color: 'white'
    },
    dots: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
        borderRadius: 100
    },
    containerDots: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems:'center'
    }
})


export default TutorialUser