import { TouchableOpacity } from "@gorhom/bottom-sheet"
import { useEffect, useState } from "react"
import { View, StyleSheet, Text, ActivityIndicator } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import {codeGenerate} from '../utils/codeGenerate'
import useForgotPassword from '../hooks/useForgotPassword'
import AsyncStorage from "@react-native-async-storage/async-storage"
import ShowError from '../components/ShowError'
import React, { useRef } from 'react';

const ForgotPassword = ({navigation})=>{


    const [emaiu, setEmaiu] = useState('')
    const [showInputCode, setShowInputCode] = useState(false)


    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);

    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');



    const [code, setCode] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [error, setError] = useState(false)

    const {sendCodeForgotPassword, loading} = useForgotPassword()




    const handleForgotPass = async () => {
        const newCode = codeGenerate()
        setCode(newCode)

        try {
            const response = await sendCodeForgotPassword(emaiu, newCode);
            if (response.status === 200) { // Se a resposta for 200 OK, email foi encontrado
                setShowInputCode(true)
                setIsExpired(false)
                setTimeRemaining(60) // Reinicia o tempo para 60 segundos
                setError(false)
            } else {
                setError(true)
            }
        } catch (error) {
            setError(true)
        }
    }

    const handleReenviarCodigo = ()=>{
        setShowInputCode(false)
        setError(false)
        setEmaiu(null)
    }

    const handleConfirmedCode = async()=>{
        
        const codeEnter = code1+code2+code3+code4


        if(code === codeEnter){
            await AsyncStorage.setItem('EMAILNEWPASSWORD', emaiu)
            navigation.navigate('NewPassword');
            setError(false)
        }else{
            setError(true)
        }
    }


    useEffect(() => {
        let timer;
    
        if (code && !isExpired) {
          timer = setInterval(() => {
            setTimeRemaining(prevTime => {
              if (prevTime <= 1) {
                clearInterval(timer);
                setIsExpired(true);
                //setShowInputCode(false)
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
        }
    
        return () => clearInterval(timer);
      }, [code, isExpired]);
      

      const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
      };


    return(
        <View style={styles.container}>

            {showInputCode && (
                <View style={styles.containerCode}>
                    <View style={styles.containerCodes}>
                        <TextInput
                            style={styles.InputCode}
                            onChangeText={(e) => {
                                setCode1(e);
                                if (e.length === 1) input2Ref.current.focus();
                            }}
                            keyboardType="numeric"
                            ref={input1Ref}
                        />
                        <TextInput
                            style={styles.InputCode}
                            onChangeText={(e) => {
                                setCode2(e);
                                if (e.length === 1) {
                                    input3Ref.current.focus();
                                } else if (e.length === 0) {
                                    input1Ref.current.focus();
                                }
                            }}
                            keyboardType="numeric"
                            ref={input2Ref}
                        />
                        <TextInput
                            style={styles.InputCode}
                            onChangeText={(e) => {
                                setCode3(e);
                                if (e.length === 1) {
                                    input4Ref.current.focus();
                                } else if (e.length === 0) {
                                    input2Ref.current.focus();
                                }
                            }}
                            keyboardType="numeric"
                            ref={input3Ref}
                        />
                        <TextInput
                            style={styles.InputCode}
                            onChangeText={(e) => {
                                setCode4(e);
                                if (e.length < 1) {
                                    input3Ref.current.focus();
                                }
                            }}
                            keyboardType="numeric"
                            ref={input4Ref}
                        />
                    </View>
                    {error && (
                        <ShowError msg="Codigo incorreto!" />
                    )}
                    <View style={styles.containerButtom}>
                        <Text style={styles.txt}>{formatTime(timeRemaining)}</Text>
                        <TouchableOpacity onPress={handleConfirmedCode}>
                            <Text style={styles.txt}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReenviarCodigo}>
                            <Text style={styles.txt}>Reenviar codigo!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {!showInputCode && (
                <View style={styles.containerEmail}>

                    <TextInput style={styles.InputEmail} placeholder="Digite seu email" onChangeText={(e)=>setEmaiu(e)} placeholderTextColor='white'/>
                    {error && (
                        <ShowError msg="Email nao encontrado"/>
                    )}
                    {loading ? (
                        <TouchableOpacity onPress={handleForgotPass} style={styles.buttonConfirmed} disabled>
                            <ActivityIndicator size={20} color="white"/>
                        </TouchableOpacity>
                    ): (
                        <TouchableOpacity onPress={handleForgotPass} style={styles.buttonConfirmed}>
                            <Text style={styles.txt}>Trocar senha</Text>
                        </TouchableOpacity>
                    )}
                    
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100,
        flex: 1,
        
    },

    containerEmail: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },

    InputEmail: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        width: '80%',
        height: '25%',
        paddingLeft: 20,
        color: 'white',
    },

    InputCode: {
        borderBottomWidth: 2,
        borderColor: 'white',
        width: 40,
        textAlign: 'center',
        fontSize: 30,
        color: 'white'
    },

    containerCodes: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center'
    },


    containerCode: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },


    containerButtom: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },

    txt: {
        color: 'white'
    },

    buttonConfirmed: {
        backgroundColor: '#31346c',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    }
})

export default ForgotPassword