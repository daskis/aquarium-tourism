// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAppDispatch } from '@shared/lib';
// import { useEffect } from 'react';
//
// export const AuthProvider = () => {
//     const location = useLocation();
//     const dispatch = useAppDispatch();
//     const token = localStorage.getItem('accessToken');
//
//     useEffect(() => {
//         if (token) {
//             // dispatch(setToken(token));
//         }
//     }, [dispatch, token]);
//
//     const { data } = useGetMeQuery(null);
//
//     if (!token) {
//         return <Navigate to="/auth/login" state={{ from: location }} replace />;
//     }
//
//     if (data) {
//         dispatch(setUser(data));
//         return <Outlet />;
//     }
//
//     return null;
// };
