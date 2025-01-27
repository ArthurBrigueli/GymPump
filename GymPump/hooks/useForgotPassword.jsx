import axios from 'axios';
import { useState } from 'react';
const API_URL = process.env.API_URL;

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const sendCodeForgotPassword = async (email, code) => {

        try {
            setLoading(true); // Inicia o carregamento
            const result = await axios.post(`http://147.79.82.47:8082/api/auth/forgotpassword/${email}`, {
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
            const result = await axios.post(`http://147.79.82.47:8082/api/auth/forgotpassword/newpassword/${email}`, {
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
