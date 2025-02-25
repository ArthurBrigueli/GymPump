import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useAuth} from '../context/AuthContext'
import axios from 'axios'

const useFetchFolha = (url)=>{

    const [data, setData] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const {user, token} = useAuth()


    const add = async(data)=>{

        await axios.post('https://gym-pump-api-apgp.vercel.app/api/folha/register', {
            id_usuario:user.id,
            folha: JSON.stringify(data)
        })
        setCallBack(!callBack)
    }

    const remove = async()=>{

        await axios.delete(`https://gym-pump-api-apgp.vercel.app/api/folha/delete/${user.id}`)

        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{

            const result = await axios.get(`https://gym-pump-api-apgp.vercel.app/api/folha/${user.id}`)
            const data = result.data.folha
            setData(data)

            
        }

        fetchData()
    }, [url, callBack, user])


    return {data, add, remove}

}

export default useFetchFolha