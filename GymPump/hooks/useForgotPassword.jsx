import axios from 'axios';
import { useState } from 'react';
import {API_URL} from '@env'
const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const sendCodeForgotPassword = async (email, code) => {

        try {
            setLoading(true); // Inicia o carregamento
            const result = await axios.post(`${API_URL}/api/auth/forgotpassword/${email}`, {
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
            const result = await axios.post(`${API_URL}/api/auth/forgotpassword/newpassword/${email}`, {
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
