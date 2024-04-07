import cls from './ToolbarItem.module.scss';
import { Link } from '@shared/ui';
import { classNames, ColorEnum, IToolbarItemProps, SizeEnum } from '@shared/lib';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ToolbarArrow from '@assets/icons/activeToolbarArrow.svg';

export const ToolbarItem = ({ link, icon }: IToolbarItemProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const { pathname } = useLocation();
    useEffect(() => {
        if (pathname.includes(link)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [pathname]);
    return (
        <li
            className={classNames(
                cls.item,
                {
                    [cls.active]: isActive,
                },
                [],
            )}
        >
            <Link size={SizeEnum.H1} color={ColorEnum.LINK} to={link}>
                {icon}
            </Link>
            {isActive && (
                <span className={cls.activeArrow}>
                    <ToolbarArrow />
                </span>
            )}
        </li>
    );
};
