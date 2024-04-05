import { createBrowserRouter } from 'react-router-dom';
import { App } from '@app';
import { Auth, Login, Register } from '@pages/ui';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/auth',
                children: [
                    {
                        index: true,
                        element: <Auth />,
                    },
                    {
                        path: 'login',
                        element: <Login />,
                    },
                    {
                        path: 'register',
                        element: <Register />,
                    },
                ],
            },
        ],
    },
]);
