import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import ModalConfigTime from "../components/ModalConfigTime";
import { Ionicons } from '@expo/vector-icons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const TimeScreen = () => {
  const [tempoTotal, setTempoTotal] = useState(0);
  const [running, setRunning] = useState(false);
  const [isDescanso, setIsDescanso] = useState(false)
  const bottomSheetRef = useRef(null)
  const [timeMinute, setTimeMinute] = useState(0)
  const [timeSecond, setTimeSecond] = useState(0)
  const [showAlertConfirmedTime, setShowAlertConfirmedTime] = useState(false)

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTempoTotal((prevTempoTotal) => prevTempoTotal + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(()=>{
    const minuto = Math.floor(tempoTotal / 60);
    const segundos = tempoTotal % 60;
    if(timeMinute > 0 || timeSecond > 0){
      if (minuto === timeMinute && segundos === timeSecond) {
        handleCallNotifications();
        setRunning(false);
      }
    }
  }, [tempoTotal])


  const comecarSerie = () => {
    setIsDescanso(false)
    setRunning(false)
    setTempoTotal(0);
  };

  const descanso = () => {
    if(!isDescanso){
        setRunning(true)
        setIsDescanso(true)
    }else{
        return
    }
  };

  const obterMinutos = () => {
    const minutos = Math.floor(tempoTotal / 60);
    return minutos < 10 ? `0${minutos}` : minutos;
  };

  const obterSegundos = () => {
    const segundos = tempoTotal % 60;
    return segundos < 10 ? `0${segundos}` : segundos;
  };

  const handleCallNotifications = async () => {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "TimePump Alert",
        body: "Seu tempo de Descanso acabou!"
      },
      trigger: {
        seconds: 1
      }
    });
  };

  const openConfig = ()=>{
    bottomSheetRef.current?.expand()
  }

  const closeConfig = ()=>{
    bottomSheetRef.current?.close()
  }

  const alterarTime = (timeMinute, timeSecond)=>{
    setTimeMinute(Number(timeMinute))
    setTimeSecond(Number(timeSecond))
    closeConfig()
    setShowAlertConfirmedTime(true)

    setTimeout(()=>{
      setShowAlertConfirmedTime(false)
    }, 1000)
  }


  return (
    <View style={styles.container}>
      {/* Cronômetro */}
      <View style={styles.cronometroContainer}>
        {isDescanso ? (
            <Text style={styles.cronometroText}>{obterMinutos()}:{obterSegundos()}s</Text>
        ):(
            <Text style={styles.TextSubTitleCronometro}>Serie em andamento...</Text>
        )}

        {!running && isDescanso && (
            <Text style={styles.TextSubTitleSerieOff}>Seu tempo de descanso acabou, Inicie a serie!</Text>
        )}
        
    
      </View>

      {/* Botões */}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoComecarSerie} onPress={comecarSerie}>
          <Text style={styles.textBotao}>Começar série</Text>
        </TouchableOpacity>
        <TouchableOpacity style={isDescanso ? styles.botaoDescansoOn:styles.botaoDescanso} onPress={descanso}>
          <Text style={styles.textBotao}>Descanso</Text>
          <Text style={styles.textBotao}>{timeMinute}:{timeSecond}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnConfig} onPress={openConfig}>
          <Ionicons name="cog" size={20} color='white'/>
      </TouchableOpacity>
      <ModalConfigTime bottomSheetRef={bottomSheetRef} alterarTime={alterarTime}/>
      {showAlertConfirmedTime && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 5 , height: '30%',width: '50%', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Ionicons name="checkmark-outline" color='green' size={50}/>
          <Text style={{fontSize: 15}}>Alteração Concluida!</Text>
        </View>
      </View>}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        backgroundColor: '#0c0d17'
    },

    cronometroContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    cronometroText:{
        fontSize: 70,
        color: 'white'
    },

    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    botaoComecarSerie: {
        margin: 5,
        backgroundColor: '#00a859',
        borderRadius: 100,
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoDescansoOn:{
      display: "none"
    },

    botaoDescanso:{
        margin: 5,
        backgroundColor: '#3498db',
        borderRadius: 100,
        width: 150,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBotao: {
        color: 'white'
    },
    TextSubTitleCronometro: {
        color: 'gray',
        fontSize: 25
    },

    TextSubTitleSerieOff: {
        color: 'gray',
    },
    btnConfig: {
      backgroundColor: '#18192d',
      justifyContent:'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 100,
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 0
    }

})

export default TimeScreen