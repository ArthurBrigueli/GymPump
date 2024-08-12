import axios from 'axios';
import { useState } from 'react';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const sendCodeForgotPassword = async (email, code) => {

        try {
            setLoading(true); // Inicia o carregamento
            const result = await axios.post(`http://192.168.0.102:8001/api/forgotpassword/${email}`, {
                code: code
            });
            return result;
        } catch (error) {
            throw error; // Repropaga o erro, se necessário
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    const setNewPassword = async (password, email) => {
        try {
            setLoading(true); // Inicia o carregamento
            const result = await axios.post(`http://192.168.0.102:8001/api/forgotpassword/newpassword/${email}`, {
                password: password
            });
            return result;
        } catch (error) {
            throw error; // Repropaga o erro, se necessário
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return { sendCodeForgotPassword, setNewPassword, loading };
};

export default useForgotPassword;
