import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator, FlatList, Modal, Alert} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import ModalDeletarConta from '../components/ModalDeletarConta';
import * as Updates from 'expo-updates'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';


const Profile = ()=>{

    const navigation = useNavigation()
    const {user, token, logoutAuth} = useAuth()
    const [showDeletarConta, setShowDeletarConta] = useState(false)
    const [invitedPending, setInvitedPending] = useState([])
    const [yourFriends, setYourFriends] = useState([])
    const [atua, setAtua] = useState(false)
    
    const handleLogout = async()=>{
        logoutAuth()
    }

    const handleLogin = ()=>{
        navigation.navigate('Login')

    }

    const deletarConta = ()=>{
        setShowDeletarConta(!showDeletarConta)
    }


    useEffect(()=>{
        const fetchInvited = async()=>{
            const result = await axios.get(`http://192.168.0.102:8082/api/auth/user/invitedfriend/${user.id}`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(result.data)

            setInvitedPending(result.data)
        }

        fetchInvited()
    },[atua])


    const acceptInvited = async(id)=>{

        const result = await axios.get(`http://192.168.0.102:8082/api/auth/user/invitedfriend/accept/${id}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setAtua(!atua)
    }


    useEffect(()=>{
        const fetchYourFriend = async()=>{
            const result = await axios.get(`http://192.168.0.102:8082/api/auth/user/yourfriends/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(result.data)
            
            setYourFriends(result.data)
        }

        fetchYourFriend()
    },[invitedPending])


    const recudeInvited = async(idInvited)=>{
        const result = await axios.delete(`http://192.168.0.102:8082/api/auth/user/recuseinvite/${idInvited}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setAtua(!atua)


    }


    const syncInvitedPending = async()=>{
        const result = await axios.get(`http://192.168.0.102:8082/api/auth/user/invitedfriend/${user.id}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setInvitedPending(result.data)
    }


    const syncInvitedAccept = async()=>{
        const result = await axios.get(`http://192.168.0.102:8082/api/auth/user/yourfriends/${user.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        
        setYourFriends(result.data)
    }


    const removeFriend = async(id)=>{
        const result = await axios.delete(`http://192.168.0.102:8082/api/auth/user/recuseinvite/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setAtua(!atua)
    }




    return(
        <View style={styles.container}>


            {showDeletarConta && (
                <ModalDeletarConta showModal={deletarConta} handleLogout={handleLogout}/>
            )}
            


            {user ? (
                <>
                    <View style={styles.containerProfile}>
                        <View style={styles.containerIconProfile}>
                            {user && (<Text style={styles.txtIcon}>{user.name[0]}</Text>)}
                        </View>
                        <View>
                            <Text style={styles.txt}>{user.name}</Text>
                            <Text style={styles.txt}>{user.email}</Text>
                        </View>
                    </View>




                    <View style={styles.containerOpcoes}>

                        <View style={styles.containerFriends}>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{color: 'white'}}>Pedidos de amizades pendentes</Text>
                                    <TouchableOpacity onPress={()=>{syncInvitedPending()}}>
                                        <Ionicons name="sync-outline" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                                {invitedPending.map((invited, index) => (
                                    <View style={styles.containerInvited} key={index}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
                                            <Text style={{color: 'white'}}>{invited.nameReceiver}</Text>
                                            <Text style={{color: 'white', backgroundColor: '#18192d', padding: 5, borderRadius: 10}}>{invited.status.toLowerCase()}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', gap: 10}}>

                                            <TouchableOpacity onPress={()=>{acceptInvited(invited.id)}}>
                                                <Ionicons name="checkmark-circle-outline" size={30} color="white" />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={()=>{recudeInvited(invited.id)}}>
                                                <Ionicons name="close-circle-outline" size={30} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Text style={{color: 'white'}}>Seus amigos</Text>
                                    <TouchableOpacity onPress={()=>{syncInvitedAccept()}}>
                                        <Ionicons name="sync-outline" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                                {yourFriends.map((friend, index)=>(
                                    <View style={styles.containerInvited} key={index}>
                                        <View style={{backgroundColor: '#18192d', padding: 7, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                            {friend.senderId == user.id ? (
                                                <Text style={{color: 'white'}}>{friend.nameReceiver}</Text>
                                            ):(
                                                <Text style={{color: 'white'}}>{friend.nameSender}</Text>
                                            )}
                                            <TouchableOpacity onPress={()=>{removeFriend(friend.id)}}>
                                                <Ionicons name="close-outline" size={20} color="white" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.opcaoDeletar} onPress={deletarConta}>
                            <Text style={styles.txt}>Deletar minha conta</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={styles.containerBtnLogout}>
                        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                            <Text style={styles.txt}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ):(
                <View style={styles.containerNotLoggin}>
                    <TouchableOpacity style={styles.btnLogout} onPress={handleLogin}>
                        <Text style={styles.txt}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0c0d17',
        flex: 1,
        justifyContent: 'space-between'
    },

    txtIcon: {
        fontSize: 20   
    },
    containerNotLoggin: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerProfile: {
        backgroundColor: '#18192d',
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        gap: 15
    },

    containerBtnLogout: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnLogout: {
        backgroundColor: '#18192d',
        borderRadius: 100,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerIconProfile: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: 'white'
    },
    containerOpcoes: {
        flex: 1,
        padding: 15,
        gap: 50,
        justifyContent: 'space-between'
    },
    opcaoDeletar: {
        padding: 15,
        borderColor: 'white',
        borderLeftWidth: 2
    },
    containerInvited: {
        paddingLeft: 20,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        
    },
    containerFriends: {
        gap: 40
    }

})


export default Profile