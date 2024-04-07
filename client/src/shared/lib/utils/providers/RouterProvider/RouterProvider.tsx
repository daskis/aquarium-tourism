import { createBrowserRouter } from 'react-router-dom';
import { Auth, Home, Login, Register, User, Map, Sales } from '@pages/ui';
import { Toolbar } from '@widgets/ui';
import { UserActions, UserArchive, UserBasket, UserFamily, UserLiked, UserSteps } from '@features/user/ui';
import { AuthProvider } from '@shared/lib/utils/providers/AuthProvider/AuthProvider.tsx';
import { MapMarkers } from '@pages/ui/MapMarkers/MapMarkers.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthProvider />,
        children: [
            {
                path: 'app',
                element: <Toolbar />,
                children: [
                    {
                        path: 'home',
                        element: <Home />,
                    },
                    {
                        path: 'user',
                        element: <User />,
                        children: [
                            {
                                index: true,
                                element: <UserActions />,
                            },
                            {
                                path: 'family',
                                element: <UserFamily />,
                            },
                            {
                                path: 'basket',
                                children: [
                                    {
                                        index: true,
                                        element: <UserBasket />,
                                    },
                                    {
                                        path: ':id',
                                        element: <UserSteps />,
                                    },
                                ],
                            },
                            {
                                path: 'liked',
                                children: [
                                    {
                                        index: true,
                                        element: <UserLiked />,
                                    },
                                    {
                                        path: ':id',
                                        element: <UserSteps />,
                                    },
                                ],
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
                    { path: 'map', element: <Map /> },
                    { path: 'map/:id', element: <MapMarkers /> },

                    { path: 'sales', element: <Sales /> },
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
