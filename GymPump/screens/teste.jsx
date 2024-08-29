import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const App = () => {
  // Referências para a animação
  const fillAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  // Função para iniciar a animação e retornar à cor original
  const animateButton = () => {
    Animated.parallel([
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Depois de completar a animação inicial, aguarda 3 segundos e inicia a animação de retorno
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fillAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start();
      }, 3000); // 3 segundos de espera
    });
  };

  // Interpolação para mudança da cor
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#2196F3', '#FF5722'], // cor inicial e cor final
  });

  // Animar a largura do gradiente de preenchimento
  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // de largura zero para largura total
  });

  return (
    <View style={styles.container}>
      <View style={styles.outerButton}>
        <Animated.View style={[styles.innerButton, { backgroundColor }]}>
          <Animated.View style={[styles.fillOverlay, { width: fillWidth, backgroundColor: '#FF5722' }]} />
          <TouchableOpacity onPress={animateButton} style={styles.buttonContent}>
            <Text style={styles.buttonText}>Pressione-me!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerButton: {
    width: 200,
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: '#2196F3', // cor inicial
  },
  innerButton: {
    height: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // necessário para o overlay
  },
  fillOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#FF5722',
    zIndex: 1, // coloca o overlay sobre o botão
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    zIndex: 2, // coloca o texto sobre o overlay
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
