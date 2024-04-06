import { createBrowserRouter } from 'react-router-dom';
import { Auth, Home, Login, Register, User, Map } from '@pages/ui';
import { Toolbar } from '@widgets/ui';
import { UserArchive, UserBasket, UserFamily, UserLiked, UserSteps } from '@features/user/ui';

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
                        children: [
                            {
                                index: true,
                                element: <UserArchive />,
                            },
                            {
                                path: ':id',
                                element: <UserSteps />,
                            },
                        ],
                    },
                ],
            },
            { path: '/map', element: <Map /> },
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
