import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'

import StatusProfile from '../components/StatusProfile/StatusProfile'
import SearchProfile from '../components/ShearchProfile'
import Post from '../components/Post'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import debounce from 'lodash.debounce'
import { useAuth } from '../context/AuthContext';




const Feed = ({navigation})=>{


    const [search, setSearch] = useState('')
    const [dataSearch, setDataSearch] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const debounceTimeoutRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const {user, token, logoutAuth} = useAuth()

    

    useEffect(()=>{
        
        const fetchSearch = async ()=>{
            
            try{
                console.log(search)
                const result = await axios.get(`http://192.168.0.102:8082/api/auth/search/user/${search}`)
                setShowSearch(true)
                setDataSearch(result.data)
                console.log(result.data)

            }catch(error){
                setShowSearch(false)
            }

        }

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchSearch();
        }, 300); // Atraso de 300ms


        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };


    }, [search])


    


    const handleSearchUser = async(idReceiver, name)=>{
        try{
            const result = await axios.post("http://192.168.0.102:8082/api/friends/envited", {
                senderId: idReceiver,
                nameSender: name,
                receiverId: user.id,
                nameReceiver: user.name
            })
            
            setShowSearch(true)
            setDataSearch(result.data)


        }catch(error){
            console.log(error)
        }
    }


    return(
        <View style={styles.container}>
            <View style={styles.containerStatusProfile}>
                <StatusProfile />
            </View>

            <View>
                <ScrollView style={{marginBottom: 60}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', position:'relative'}}>
                        <View>
                            <SearchProfile setSearch={setSearch}/>
                        </View>
                        {showSearch && (
                            <View style={styles.containerSearchList}>
                                {dataSearch.map((userSearch, index)=>(
                                    <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <Text style={{color: 'white'}}>{`${userSearch.name} #${userSearch.id}`}</Text>
                                        {userSearch.status == "ACCEPTED" ? (
                                                <TouchableOpacity onPress={()=>{handleSearchUser(userSearch.id, userSearch.name)}}>
                                                    <Text style={{color: 'white', backgroundColor: '#22233C', borderRadius: 10, padding: 5, fontSize: 12    }}>Amigo</Text>
                                                </TouchableOpacity>
                                        ):userSearch.status == 'PENDING' ?(
                                            
                                            <TouchableOpacity onPress={()=>{handleSearchUser(userSearch.id, userSearch.name)}}>
                                                <Text style={{color: 'white', backgroundColor: '#22233C', borderRadius: 10, padding: 5, fontSize: 12    }}>Pendente</Text>
                                            </TouchableOpacity>
                                        ):userSearch.id == user.id ?(
                                            <TouchableOpacity onPress={()=>{handleSearchUser(userSearch.id, userSearch.name)}}>
                                                <Text style={{color: 'white', backgroundColor: '#22233C', borderRadius: 10, padding: 5, fontSize: 12    }}>Você</Text>
                                            </TouchableOpacity>
                                        ):(

                                            <TouchableOpacity onPress={()=>{handleSearchUser(userSearch.id, userSearch.name)}}>
                                                <Ionicons name="person-add-outline" size={20} color="white" />
                                            </TouchableOpacity>
                                        
                                        )}

                                        

                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.containerFeed}>
                        
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    containerStatusProfile: {
        alignItems: 'center',
        width: '100%',
        gap: 20
    },
    container: {
        backgroundColor: '#0c0d17',
        alignItems: 'center',
        flex: 1,
    },
    containerFeed: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'red',
        zIndex: 1
    },
    feed: {
        backgroundColor: 'white',
        width: '100%'
    },
    containerProfile: {

    },
    desc: {

    },
    containerSearchList: {
        backgroundColor: '#18192D',
        width: '90%',
        position: 'absolute',
        top: 100,
        zIndex: 2,
        padding: 20
    }
})


export default Feed