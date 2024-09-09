import { useEffect, useState } from 'react';
import { createTable, fetchTreinos, insertTreino, removeTable, updateExercicio, deleteId, fetchTreinoId, updateTreino } from '../databases/DataBase';
import {format} from 'date-fns'
import {useAuth} from '../context/AuthContext'
import axios from 'axios'
import { isReanimated3 } from 'react-native-reanimated';
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
        if(user){
            const idTreino = await axios.post('http://192.168.0.102:8082/api/treinos/treino/create', {
                idUser: user.id,
                name: name,
                date: dataFormat,
                exercicios: prevExercicios
            },{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })


            console.log(idTreino.data)
            setIdTreino(idTreino.data.id)
        }else{
            const idTreino = await insertTreino(name, dataFormat, JSON.stringify(prevExercicios))
            setIdTreino(idTreino)
        }
        setCallBack(!callBack)
    }

    const removeTreino = async()=>{
        removeTable()
        setData(null)
        setCallBack(!callBack)
    }

    const update = async(id, exercicios)=>{
        if(user){
            await axios.put(`http://192.168.0.102:8082/api/treinos/exercicios/add`, {
                id: id,
                exercicios: exercicios
            },{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }else{
            updateExercicio(id, JSON.stringify(exercicios))
        }
        setCallBack(!callBack)
    }

    const updateTreinoId = async(id, name, data, exercicios) => {

        if(user){
            const result = await axios.put(`http://192.168.0.102:8082/api/treinos/treino/update/${id}`, {
                idUser: user.id,
                name: name,
                date: data,
                exercicios: exercicios
            },{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            
        }else{
            updateTreino(id, name, data, JSON.stringify(exercicios))
        }
        setCallBack(!callBack)
    }

    const removeTreinoId = async(id)=>{
        setloading(true)
        if(user){
            await axios.delete(`http://192.168.0.102:8082/api/treinos/delete/${id}/user/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }else{
            deleteId(id)
        }
        setCallBack(!callBack)
        setloading(false)
    }

    const fetchIdTreino = async(id)=>{
        setLoadingEdit(true)

        if(user){
            const result = await axios.get(`http://192.168.0.102:8082/api/treinos/user/treino/${id}/${user.id}`,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(result.data)
            setLoadingEdit(false)
            setDataId([result.data])
        }else{
            fetchTreinoId(id, (treino)=>{
                const treinoAtualizado = treino.map((treino)=> {
                    return {
                        ...treino,
                        exercicios: JSON.parse(treino.exercicios)
                    }
                })
                setLoadingEdit(false)
                setDataId(treinoAtualizado)
            })
        }

        
        
    }

    useEffect(()=>{
        setloading(true)
            const fetchData = async()=>{

                if(user){
                    const data = await axios.get(`http://192.168.0.102:8082/api/treinos/user/${user.id}`, {
                        headers: {
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    const treinos = data.data
                    setData(treinos)
                }else{
                    fetchTreinos((treino)=>{
                        const treinosAtualizados = treino.map((treino) => {
                            return {
                              ...treino,
                              exercicios: JSON.parse(treino.exercicios),
                            };
                        });
                        setData(treinosAtualizados)
                    })
                }

            }
    
            fetchData()
        setloading(false)
        
    }, [url,callBack, user])


    return {addTreino, removeTreino, data, idTreino, update, removeTreinoId, fetchIdTreino, dataId, loadingEdit, loading, updateTreinoId}

}


export default useFetchTreino