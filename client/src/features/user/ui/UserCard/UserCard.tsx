import cls from './UserCard.module.scss';
import { Heading } from '@shared/ui';
import { ColorEnum, SizeEnum, useAppSelector } from '@shared/lib';
import Info from '@assets/icons/info.svg';
import UserIcon from '@assets/icons/userIcon.svg';
import { UserChangeModal, UserInfoModal } from '@features/user/ui';
import { useState } from 'react';
import { selectCurrentUser } from '@features/user/lib';

export const UserCard = () => {
    const [isOpenChange, setIsOpenChange] = useState<boolean>(false);
    const handleClickChange = () => {
        setIsOpenChange(!isOpenChange);
    };
    const [isOpenInfo, setIsOpenInfo] = useState<boolean>(false);
    const handleClickInfo = () => {
        setIsOpenInfo(!isOpenInfo);
    };
    const username = useAppSelector(selectCurrentUser).username;

    return (
        <>
            <div className={cls.wrapper}>
                <div onClick={handleClickInfo} className={cls.avatar}>
                    <UserIcon />
                </div>
                <Heading color={ColorEnum.LIGHT} size={SizeEnum.H6}>
                    {username}
                </Heading>
                <div onClick={handleClickChange} className={cls.moreInfo}>
                    <Info />
                </div>
            </div>
            <UserChangeModal isOpen={isOpenChange} handleChange={handleClickChange} />
            <UserInfoModal isOpen={isOpenInfo} handleChange={handleClickInfo} />
        </>
    );
};
