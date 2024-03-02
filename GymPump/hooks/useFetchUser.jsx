import axios from 'axios'
import { useState } from 'react'


const useFetchUser = ()=>{

    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [status, setStatus] = useState(null)


    const loginUser = async(nome, senha)=>{

        setLoading(true)
        const response = await axios.post('http://192.168.0.103:8000/api/login/user', {
            nome,
            senha
        })

        if(response.data.token){
            setData(response.data)
            setToken(response.data.token)
        }

        setLoading(false)
    }

    const registerUser = async(nome, email, senha)=>{
        setLoading(true)
        try{
            const response = await axios.post('http://192.168.0.103:8000/api/register/user', {
                nome: nome,
                email: email,
                senha: senha
            })
            setStatus(response.status)
        }catch(erro){
            if(erro.response && erro.response.data && erro.response.data.error){
                setErrorEmail(erro.response.data.error)
            }
        }
        setLoading(false)
    }


    return {loginUser, token, data, errorEmail, registerUser, status, loading}


}   


export default useFetchUser