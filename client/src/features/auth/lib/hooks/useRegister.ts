import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterProps, useRegisterMutation } from '@features/auth/lib';
import { toast } from 'react-toastify';

export const useRegister = () => {
    const [trigger, { data, error, isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    useEffect(() => {
        if (data?.access_token) {
            localStorage.setItem('accessToken', data.access_token.split(' ')[0]);
            toast('Успех!');
            setTimeout(() => {
                navigate('/app/home');
            }, 2000);
        }
        if (error) {
            console.log(error);
        }
    }, [data]);
    const registerTrigger = async (values: RegisterProps) => {
        if (values) {
            await trigger(values);
        }
    };
    return { registerTrigger, isLoading };
};
