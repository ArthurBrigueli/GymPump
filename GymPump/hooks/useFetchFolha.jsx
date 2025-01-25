import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import {API_URL} from '@env'

const useFetchFolha = (url)=>{

    const [data, setData] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const {user, token} = useAuth()


    const add = async(data)=>{

        await axios.post(`${API_URL}/api/folhas/folha/create`, {
            idUser:user.id,
            folha: data
        },{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setCallBack(!callBack)
    }

    const remove = async()=>{

        const a = await axios.delete(`${API_URL}/api/folhas/folha/delete/user/${user.id}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{

            const result = await axios.get(`${API_URL}/api/folhas/user/${user.id}`, {
                headers: {
                    "Authorization":`Bearer ${token}` 
                }
            })

            const data = result.data.folha
            setData(data)

            
        }

        fetchData()
    }, [url, callBack, user])


    return {data, add, remove}

}

export default useFetchFolha