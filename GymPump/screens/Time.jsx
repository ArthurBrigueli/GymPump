import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, Animated } from 'react-native';
import * as Notifications from 'expo-notifications';
import ModalConfigTime from "../components/ModalConfigTime";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { timeStyle } from "../styles/Time/timeStyle";
import LottieView from 'lottie-react-native'
import StatusProfile from "../components/StatusProfile/StatusProfile";

import { MaterialIcons } from '@expo/vector-icons';

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
  const [showAlertConfirmedTime, setShowAlertConfirmedTime] = useState(false)
  const [fadeIn] = useState(new Animated.Value(0))
  const [timeData, setTimeData] = useState({ minutos: 0, segundos: 0 })

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTempoTotal((prevTempoTotal) => prevTempoTotal + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const minuto = Math.floor(tempoTotal / 60);
    const segundos = tempoTotal % 60;
    if (timeData.minutos > 0 || timeData.segundos > 0) {
      if (minuto === timeData.minutos && segundos === timeData.segundos) {
        handleCallNotifications();
        setRunning(false);
      }
    }
  }, [tempoTotal])


  useEffect(() => {
    const data = async () => {
      const data = await AsyncStorage.getItem('TimeDescanso')
      if (data) {
        setTimeData(JSON.parse(data))
      }
    }


    data()
  }, [])


  const comecarSerie = () => {
    setIsDescanso(false)
    setRunning(false)
    setTempoTotal(0);
  };

  const descanso = () => {
    if (!isDescanso) {
      setRunning(true)
      setIsDescanso(true)
    } else {
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

  const openConfig = () => {
    bottomSheetRef.current?.expand()
  }

  const closeConfig = () => {
    bottomSheetRef.current?.close()
  }

  const alterarTime = (minutos, segundos) => {
    salvarTimeLocal(minutos, segundos)
    closeConfig()

    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start()

    setShowAlertConfirmedTime(true)

    setTimeout(() => {
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setShowAlertConfirmedTime(false);
      });
    }, 2000);
  }

  const salvarTimeLocal = async (minutos, segundos) => {
    const data = { minutos: Number(minutos), segundos: Number(segundos) }
    setTimeData({ minutos: Number(minutos), segundos: Number(segundos) })
    const dataJson = JSON.stringify(data)
    await AsyncStorage.setItem('TimeDescanso', dataJson)
  }

  const del = async () => {
    await AsyncStorage.removeItem('TimeDescanso')
    console.log('deletado')
  }





  return (
    <View style={timeStyle.container}>

      <View style={timeStyle.containerStatusProfile}>
        <StatusProfile />
      </View>

      <View style={timeStyle.containerTime}>
        <View style={timeStyle.cronometroContainer}>
          {isDescanso ? (
            <Text style={timeStyle.cronometroText}>{obterMinutos()}:{obterSegundos()}s</Text>
          ) : (
            <Text style={timeStyle.TextSubTitleCronometro}>Serie em andamento...</Text>
          )}

          {!running && isDescanso && (
            <Text style={timeStyle.TextSubTitleSerieOff}>Seu tempo de descanso acabou, Inicie a serie!</Text>
          )}


        </View>


        <View style={timeStyle.botoesContainer}>
          {isDescanso ? (
            <TouchableOpacity style={timeStyle.botaoComecarSerie} onPress={comecarSerie}>
              <Text style={timeStyle.textBotao}>Começar série</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={timeStyle.botaoDescanso} onPress={descanso}>
              <Text style={timeStyle.textBotao}>Descanso</Text>
              <Text style={timeStyle.textBotao}>{timeData.minutos}:{timeData.segundos}</Text>
            </TouchableOpacity>
          )}


        </View>

      </View>

      <TouchableOpacity style={timeStyle.btnConfig} onPress={openConfig}>
        <Ionicons name="cog" size={20} color='white' />
      </TouchableOpacity>
      <ModalConfigTime bottomSheetRef={bottomSheetRef} alterarTime={alterarTime} />
      {showAlertConfirmedTime && (
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: fadeIn, // Use a opacidade animada aqui
          }}
        >
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 5, height: '30%', width: '50%', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <LottieView
              source={require('../assets/animationImg/animationConfirmed.json')}
              autoPlay
              style={{
                width: 80,
                height: 80
              }}
            />
            <Text style={{ fontSize: 15 }}>Alteração Concluída!</Text>
          </View>
        </Animated.View>
      )}


      <View>

        <Text style={timeStyle.timeTip}>Aqui voçê define seu tempo de descanço</Text>
        <MaterialIcons style={timeStyle.iconTip} name="subdirectory-arrow-right" size={60} color="#333863" />

      </View>

    </View>
  );
};



export default TimeScreen