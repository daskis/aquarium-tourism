import { useEffect } from 'react';
// import { toast } from 'react-toastify';
import { useAppDispatch } from '@shared/lib';
import { useNavigate } from 'react-router-dom';
import { LoginProps, useLoginMutation } from '@features/auth/lib';
import { toast } from 'react-toastify';

export const useLogin = () => {
    const [trigger, { data, error, isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
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
    }, [data, error]);
    const loginTrigger = async (values: LoginProps) => {
        if (values) {
            await trigger(values);
        }
    };
    return { loginTrigger, isLoading };
};
