import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib';
import { setUser, useGetMeQuery } from '@features/user/lib';

export const AuthProvider = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const token = localStorage.getItem('accessToken');

    const { data } = useGetMeQuery(null);

    if (!token) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (data) {
        dispatch(setUser(data));
        return <Outlet />;
    }

    return null;
};
