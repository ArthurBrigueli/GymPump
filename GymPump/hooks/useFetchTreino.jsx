import { useEffect, useState } from 'react';
import {format} from 'date-fns'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
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
        const idTreino = await axios.post('https://gym-pump-api-apgp.vercel.app/api/treinos/register', {
            id_usuario: user.id,
            nome: name,
            data: dataFormat,
            exercicios: prevExercicios
        })

        setIdTreino(idTreino.data.id)
        setCallBack(!callBack)
    }

    const removeTreino = async()=>{
        removeTable()
        setData(null)
        setCallBack(!callBack)
    }

    const update = async(id, exercicios)=>{
        await axios.put(`https://gym-pump-api-apgp.vercel.app/api/user/${user.id}/treino/${id}/exercicios/register`, {
            exercicios: exercicios
        })
        setCallBack(!callBack)
    }

    const updateTreinoId = async(id, nome, data, exercicios) => {

        const result = await axios.put(`https://gym-pump-api-apgp.vercel.app/api/user/${user.id}/treino/${id}/update`, {
            nome: nome,
            data: data,
            exercicios: exercicios
        })
        setCallBack(!callBack)
    }

    const removeTreinoId = async(id)=>{
        await axios.delete(`https://gym-pump-api-apgp.vercel.app/api/treinos/delete/${user.id}/${id}`)
        setCallBack(!callBack)
    }

    const fetchIdTreino = async(id)=>{
        setLoadingEdit(true)

        const result = await axios.get(`https://gym-pump-api-apgp.vercel.app/api/treino/${user.id}/${id}`)
        setLoadingEdit(false)
        setDataId(result.data)

        
        
    }

    useEffect(()=>{
        setloading(true)
            const fetchData = async()=>{

                const data = await axios.get(`https://gym-pump-api-apgp.vercel.app/api/treinos/${user.id}`)
                const treinos = data.data
                setData(treinos)

            }
    
            fetchData()
        setloading(false)
        
    }, [url,callBack, user])


    return {addTreino, removeTreino, data, idTreino, update, removeTreinoId, fetchIdTreino, dataId, loadingEdit, loading, updateTreinoId}

}


export default useFetchTreino