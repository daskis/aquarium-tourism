import cls from './UserTabs.module.scss';
import Family from '@assets/icons/userTabFamily.svg';
import Basket from '@assets/icons/userTabBasket.svg';
import Archive from '@assets/icons/userTabArchive.svg';
import Liked from '@assets/icons/userTabLiked.svg';
import { useLocation } from 'react-router-dom';
import { Link } from '@shared/ui';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';

interface UserTab {
    icon: any;
    link: string;
}

export const UserTabs = () => {
    const { pathname } = useLocation();
    const list: UserTab[] = [
        { icon: <Family />, link: '/user/family' },
        { icon: <Archive />, link: '/user/archive' },
        { icon: <Basket />, link: '/user/basket' },
        { icon: <Liked />, link: '/user/liked' },
    ];
    return (
        <ul className={cls.list}>
            {list.map((item) => (
                <li
                    className={classNames(
                        cls.listItem,
                        {
                            [cls.listItemActive]: item.link === pathname,
                        },
                        [],
                    )}
                    key={item.link}
                >
                    <Link size={SizeEnum.H2} color={ColorEnum.LINK} to={item.link}>
                        {item.icon}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
