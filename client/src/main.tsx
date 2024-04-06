import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@shared/lib';
import { router } from '@shared/lib/utils';
import { RouterProvider } from 'react-router-dom';
import '@app/styles/global.scss';
import { App } from '@app';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App>
                <RouterProvider router={router} />
            </App>
        </Provider>
    </React.StrictMode>,
);
