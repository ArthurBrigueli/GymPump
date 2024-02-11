import { useEffect, useState } from 'react';
import { createTable, fetchTreinos, insertTreino, removeTable, updateExercicio, deleteId } from '../databases/DataBase';

const useFetchTreino = (url)=>{

    const [idTreino, setIdTreino] = useState(null)
    const [callBack, setCallBack] = useState(false)
    const [data, setData] = useState(null)

    const addTreino = async(name, date)=>{
        const idTreino = await insertTreino(name, date)
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

    const removeTreinoId = (id)=>{
        deleteId(id)
        setCallBack(!callBack)
    }

    useEffect(()=>{
        const fetchData = async()=>{

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

        fetchData()
        
    }, [url,callBack])


    return {addTreino, removeTreino, data, idTreino, update, removeTreinoId}

}


export default useFetchTreino