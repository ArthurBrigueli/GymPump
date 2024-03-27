import { useEffect, useState } from 'react';
import { createTable, fetchTreinos, insertTreino, removeTable, updateExercicio, deleteId, fetchTreinoId, updateTreino } from '../databases/DataBase';
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
        if(user.id){
            const idTreino = await axios.post('http://192.168.0.102:8001/api/treinos/register', {
                id_usuario: user.id,
                nome: name,
                data: dataFormat,
                exercicios: prevExercicios
            })

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
        if(user.id){
            await axios.put(`http://192.168.0.102:8001/api/user/${user.id}/treino/${id}/exercicios/register`, {
                exercicios: exercicios
            })
        }else{
            updateExercicio(id, JSON.stringify(exercicios))
        }
        setCallBack(!callBack)
    }

    const updateTreinoId = async(id, nome, data, exercicios) => {

        if(user.id){
            const result = await axios.put(`http://192.168.0.102:8001/api/user/${user.id}/treino/${id}/update`, {
                nome: nome,
                data: data,
                exercicios: exercicios
            })
            
        }else{
            updateTreino(id, nome, data, JSON.stringify(exercicios))
        }
        setCallBack(!callBack)
    }

    const removeTreinoId = async(id)=>{
        if(user.id){
            await axios.delete(`http://192.168.0.102:8001/api/treinos/delete/${user.id}/${id}`)
        }else{
            deleteId(id)
        }
        setCallBack(!callBack)
    }

    const fetchIdTreino = async(id)=>{
        setLoadingEdit(true)

        if(user.id){
            const result = await axios.get(`http://192.168.0.102:8001/api/treino/${user.id}/${id}`)
            setLoadingEdit(false)
            setDataId(result.data)
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

                if(user.id){
                    const data = await axios.get(`http://192.168.0.102:8001/api/treinos/${user.id}`)
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