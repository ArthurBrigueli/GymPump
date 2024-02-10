import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const useFetchFolha = (url)=>{

    const [data, setData] = useState(null)
    const [callBack, setCallBack] = useState(false)


    const add = async(data)=>{
        const dataA = JSON.stringify(data)
        await AsyncStorage.setItem('FolhaDeTreino', dataA)
        setCallBack(!callBack)
    }

    const remove = async()=>{
        await AsyncStorage.removeItem('FolhaDeTreino');
        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const data = await AsyncStorage.getItem('FolhaDeTreino')
            const dataForm = JSON.parse(data)
            setData(dataForm)
            setCallBack(!callBack)
        }

        fetchData()
    }, [url, callBack])


    return {data, add, remove}

}

export default useFetchFolha