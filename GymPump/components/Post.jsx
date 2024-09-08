import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import TreinoPost from './TreinoPost';  // Ajuste o caminho conforme necessário

// Mock de dados e funções
const mockItem = {
    id: 1,
    nome: 'Treino A',
    data: '2024-09-06',
    exercicios: [
        { nome: 'Exercicio 1', detalhes: 'Detalhes do Exercicio 1' },
        { nome: 'Exercicio 2', detalhes: 'Detalhes do Exercicio 2' }
    ]
};

const openModalEdit = (id) => alert(`Edit modal for item with id: ${id}`);
const excluirExercicio = (id) => alert(`Excluir item with id: ${id}`);
const limitarString = (str) => str.length > 20 ? str.substring(0, 20) + '...' : str;

const Post = () => {
    const [liked, setLiked] = useState(false);
    const [showHeart, setShowHeart] = useState(false);

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const scaleAnima = useRef(new Animated.Value(0)).current; // Começa invisível

    const handleLiked = () => {
        setLiked(!liked);

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,  // Aumenta o tamanho do ícone
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,    // Volta ao tamanho padrão
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    };

    const handleTap = (event) => {
        if (event.nativeEvent.state === State.END) {
            setLiked(!liked);
            setShowHeart(true); // Mostrar o coração quando houver um duplo toque

            // Animação para o coração aparecer e desaparecer
            Animated.sequence([
                Animated.timing(scaleAnima, {
                    toValue: 1, // Aumenta o tamanho do coração
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.delay(200), // Mantém o coração visível por 1 segundo
                Animated.timing(scaleAnima, {
                    toValue: 0, // Diminuir o tamanho do coração e torná-lo invisível
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start(() => setShowHeart(false)); // Define `showHeart` para `false` após a animação
        }
    };

    return (
        <TapGestureHandler onPress={handleTap} onHandlerStateChange={handleTap} numberOfTaps={2}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity style={styles.containerProfile}>
                        <Text>A</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>Arthur Brigueli</Text>
                </View>

                <View>
                    <Text style={{ color: 'white' }}>Hoje eu bati meu recorde, que treino foda</Text>
                </View>

                <View>
                    <TreinoPost 
                        item={mockItem} 
                        openModalEdit={openModalEdit} 
                        excluirExercicio={excluirExercicio} 
                        loading={false} 
                        loadingEdit={false} 
                        limitarString={limitarString} 
                    />
                </View>

                <View style={{ marginLeft: 10, flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLiked}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Ionicons 
                                name={liked ? "heart" : "heart-outline"} 
                                size={25} 
                                color={liked ? "red" : "white"} 
                            />
                        </Animated.View>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>102 curtidas</Text>
                </View>

                {showHeart && (
                    <Animated.View 
                        style={[styles.animatedHeart, { transform: [{ scale: scaleAnima }] }]}
                    >
                        <Ionicons name="heart" size={130} color="red" />
                    </Animated.View>
                )}
            </View>
        </TapGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#22233C',
        borderRadius: 5,
        position: 'relative'
    },
    containerProfile: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedHeart: {
        position: 'absolute',
        bottom: 100,
        left: 100
    }
});

export default Post;
