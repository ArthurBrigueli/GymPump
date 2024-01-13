import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

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

    if (minuto === 1 && segundos === 30) {
      handleCallNotifications();
      setRunning(false);
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
      console.log('Você não permitiu a notificação');
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
        <TouchableOpacity style={styles.botaoDescanso} onPress={descanso}>
          <Text style={styles.textBotao}>Descanso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        gap: 100,
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
        padding: 20,
        backgroundColor: '#00a859',
        borderRadius: 100,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoDescanso:{
        margin: 5,
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 100,
        width: 150,
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
    }

})

export default TimeScreen