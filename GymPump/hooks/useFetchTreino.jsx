import { useEffect, useState } from 'react';
import {format} from 'date-fns'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import { isReanimated3 } from 'react-native-reanimated';
const API_URL = process.env.API_URL;

const useFetchTreino = (url)=>{

    const [idTreino, setIdTreino] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const [data, setData] = useState([])
    const [dataId, setDataId] = useState(null)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loading, setloading] = useState(false)
    const {user, token} = useAuth()

    const addTreino = async(name, date)=>{

        {/**mesmo o usuario nao salvando o treino eh criado com a estrutura base para nao quebrar */}
        const prevExercicios = [
        ]
        
        const dataFormat = format(date, 'dd/MM/yyyy')
        const idTreino = await axios.post(`${API_URL}/api/treinos/treino/create`, {
            idUser: user.id,
            name: name,
            date: dataFormat,
            exercicios: prevExercicios
        },{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })


        setIdTreino(idTreino.data.id)

        setCallBack(!callBack)
    }

    const removeTreino = async()=>{
        setData(null)
        setCallBack(!callBack)
    }

    const update = async(id, exercicios)=>{
        await axios.put(`${API_URL}/api/treinos/exercicios/add`, {
                id: id,
                exercicios: exercicios
            },{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
        })
        setCallBack(!callBack)
    }

    const updateTreinoId = async(id, name, data, exercicios) => {

        const result = await axios.put(`${API_URL}/api/treinos/treino/update/${id}`, {
            idUser: user.id,
            name: name,
            date: data,
            exercicios: exercicios
        },{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setCallBack(!callBack)
    }

    const removeTreinoId = async(id)=>{
        setloading(true)
        await axios.delete(`${API_URL}/api/treinos/delete/${id}/user/${user.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setCallBack(!callBack)
        setloading(false)
    }

    const fetchIdTreino = async(id)=>{
        setLoadingEdit(true)

        const result = await axios.get(`${API_URL}/api/treinos/user/treino/${id}/${user.id}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setLoadingEdit(false)
        setDataId([result.data])

        
        
    }

    useEffect(()=>{
        setloading(true)
            const fetchData = async()=>{

                const data = await axios.get(`${API_URL}/api/treinos/user/${user.id}`, {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                })
                const treinos = data.data
                setData(treinos)

            }
    
            fetchData()
        setloading(false)
        
    }, [url,callBack, user])


    return {addTreino, removeTreino, data, idTreino, update, removeTreinoId, fetchIdTreino, dataId, loadingEdit, loading, updateTreinoId}

}


export default useFetchTreino