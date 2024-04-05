import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib';
import { useNavigate } from 'react-router-dom';
import { RegisterProps, useRegisterMutation } from '@features/auth/lib';
// import { toast } from 'react-toastify';

export const useRegister = () => {
    const [trigger, { data, error, isLoading }] = useRegisterMutation();
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
    }, [data]);
    const registerTrigger = async (values: RegisterProps) => {
        if (values) {
            await trigger(values);
        }
    };
    return { registerTrigger, isLoading };
};
