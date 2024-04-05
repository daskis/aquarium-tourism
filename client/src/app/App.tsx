import { classNames, useTheme } from '@shared/lib';
import { Outlet } from 'react-router-dom';

export const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Outlet />
        </div>
    );
};
