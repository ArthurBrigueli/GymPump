import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useAuth} from '../context/AuthContext'
import axios from 'axios'

const useFetchFolha = (url)=>{

    const [data, setData] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const {user, token} = useAuth()


    const add = async(data)=>{

        if(user){
            await axios.post('http://192.168.0.102:8082/api/folhas/folha/create', {
                idUser:user.id,
                folha: data
            },{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }else{
            const dataA = JSON.stringify(data)
            await AsyncStorage.setItem('FolhaDeTreino', dataA)
        }
        setCallBack(!callBack)
    }

    const remove = async()=>{

        if(user){
            const a = await axios.delete(`http://192.168.0.102:8082/api/folhas/folha/delete/user/${user.id}`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        }else{
            await AsyncStorage.removeItem('FolhaDeTreino');
        }

        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{

            if(user){
                const result = await axios.get(`http://192.168.0.102:8082/api/folhas/user/${user.id}`, {
                    headers: {
                        "Authorization":`Bearer ${token}` 
                    }
                })

                const data = result.data.folha
                setData(data)
                
            }else{
                const data = await AsyncStorage.getItem('FolhaDeTreino')
                const dataForm = JSON.parse(data)
                setData(dataForm)
            }

            
        }

        fetchData()
    }, [url, callBack, user])


    return {data, add, remove}

}

export default useFetchFolha