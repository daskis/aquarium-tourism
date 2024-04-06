import { createBrowserRouter } from 'react-router-dom';
import { App } from '@app';
import { Auth, Home, Login, Register, User } from '@pages/ui';
import { Toolbar } from '@widgets/ui';
import { UserArchive, UserBasket, UserFamily, UserLiked } from '@features/user/ui';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Toolbar />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'user',
                element: <User />,
                children: [
                    {
                        path: 'family',
                        element: <UserFamily />,
                    },
                    {
                        path: 'basket',
                        element: <UserBasket />,
                    },
                    {
                        path: 'liked',
                        element: <UserLiked />,
                    },
                    {
                        path: 'archive',
                        element: <UserArchive />,
                    },
                ],
            },
        ],
    },
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
]);
