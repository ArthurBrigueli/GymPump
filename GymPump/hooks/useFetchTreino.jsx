import { useEffect, useState } from 'react';
import { createTable, fetchTreinos, insertTreino, removeTable, updateExercicio, deleteId, fetchTreinoId, updateTreino } from '../databases/DataBase';
import {format} from 'date-fns'
const useFetchTreino = (url)=>{

    const [idTreino, setIdTreino] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const [data, setData] = useState(null)
    const [dataId, setDataId] = useState(null)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [loading, setloading] = useState(false)

    const addTreino = async(name, date)=>{
        const dataFormat = format(date, 'dd/MM/yyyy')
        const idTreino = await insertTreino(name, dataFormat)
        setIdTreino(idTreino)
        setCallBack(!callBack)
    }

    const removeTreino = async()=>{
        removeTable()
        setData(null)
        setCallBack(!callBack)
    }

    const update = (id, exercicios)=>{
        updateExercicio(id, JSON.stringify(exercicios))
        setCallBack(!callBack)
    }

    const updateTreinoId = (id, nome, data, exercicios) => {
        updateTreino(id, nome, data, JSON.stringify(exercicios))
        setCallBack(!callBack)
    }

    const removeTreinoId = (id)=>{
        deleteId(id)
        setCallBack(!callBack)
    }

    const fetchIdTreino = (id)=>{
        setLoadingEdit(true)
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

    useEffect(()=>{
        const fetchData = async()=>{
            setloading(true)
            fetchTreinos((treino)=>{
                const treinosAtualizados = treino.map((treino) => {
                    return {
                      ...treino,
                      exercicios: JSON.parse(treino.exercicios),
                    };
                });
                setloading(false)
                setData(treinosAtualizados)
            })
        }

        fetchData()
        
    }, [url,callBack])


    return {addTreino, removeTreino, data, idTreino, update, removeTreinoId, fetchIdTreino, dataId, loadingEdit, loading, updateTreinoId}

}


export default useFetchTreino