import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useAuth} from '../context/AuthContext'
import axios from 'axios'

const useFetchFolha = (url)=>{

    const [data, setData] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const {user, token} = useAuth()


    const add = async(data)=>{

        if(user.id){
            await axios.post('https://gym-pump-api.vercel.app/api/folha/register', {
                id_usuario:user.id,
                folha: JSON.stringify(data)
            })
        }else{
            const dataA = JSON.stringify(data)
            await AsyncStorage.setItem('FolhaDeTreino', dataA)
        }
        setCallBack(!callBack)
    }

    const remove = async()=>{

        if(user.id){
            await axios.delete(`https://gym-pump-api.vercel.app/api/folha/delete/${user.id}`)
        }else{
            await AsyncStorage.removeItem('FolhaDeTreino');
        }

        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{

            if(user.id){
                const result = await axios.get(`https://gym-pump-api.vercel.app/api/folha/${user.id}`)
                const data = result.data.folha
                setData(data)
                
            }else{
                const data = await AsyncStorage.getItem('FolhaDeTreino')
                const dataForm = JSON.parse(data)
                setData(dataForm)
            }

            
        }

        fetchData()
    }, [url, callBack])


    return {data, add, remove}

}

export default useFetchFolha