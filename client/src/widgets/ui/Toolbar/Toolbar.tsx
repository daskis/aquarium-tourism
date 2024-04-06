import cls from './Toolbar.module.scss';
import User from '@assets/icons/user.svg';
import Home from '@assets/icons/home.svg';
import Map from '@assets/icons/map.svg';
import Sales from '@assets/icons/sales.svg';
import { IToolbarItemProps } from '@shared/lib';
import { ToolbarItem } from '@shared/ui';
import { Outlet } from 'react-router-dom';

export const Toolbar = () => {
    const list: IToolbarItemProps[] = [
        {
            icon: <Home />,
            link: '/',
        },
        {
            icon: <Map />,
            link: '/map',
        },
        {
            icon: <Sales />,
            link: '/sales',
        },
        {
            icon: <User />,
            link: '/user',
        },
    ];

    return (
        <>
            <Outlet />
            <div className={cls.wrapper}>
                <ul className={cls.list}>
                    {list.map((item) => (
                        <ToolbarItem key={item.link} icon={item.icon} link={item.link} />
                    ))}
                </ul>
            </div>
        </>
    );
};
