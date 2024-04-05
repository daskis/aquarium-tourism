import { useEffect } from 'react';
// import { toast } from 'react-toastify';
import { useAppDispatch } from '@shared/lib';
import { useNavigate } from 'react-router-dom';
import { LoginProps, useLoginMutation } from '@features/auth/lib';

export const useLogin = () => {
    const [trigger, { data, error, isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        // if (data?.accessToken) {
        //     localStorage.setItem('accessToken', data.accessToken.split(' ')[0]);
        //     dispatch(setToken(data.accessToken));
        //     toast('Успех!');
        //     setTimeout(() => {
        //         navigate('/app');
        //     }, 2000);
        // }
        // if (error) {
        //     // @ts-ignore
        //     toast.error(error?.data?.message);
        // }
        if (data) {
            console.log(data);
        }
    }, [data, error]);
    const loginTrigger = async (values: LoginProps) => {
        if (values) {
            await trigger(values);
        }
    };
    return { loginTrigger, isLoading };
};
