import cls from './UserFamily.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, parseJwt, SizeEnum, useAppSelector } from '@shared/lib';
import UserIcon from '@assets/icons/userIcon.svg';
import Plus from '@assets/icons/plus.svg';
import { selectCurrentUser, useGetChildren } from '@features/user/lib';
import { useEffect } from 'react';

// interface IFamilyMember {
//     firstName: string;
//     lastName: string;
//     age: number;
//     id: string;
//     img: string;
// }

export const UserFamily = () => {
    const info = parseJwt(localStorage.getItem('accessToken'));
    const username = useAppSelector(selectCurrentUser).username;
    const { trigger, data } = useGetChildren();
    useEffect(() => {
        if (info.user_id) {
            trigger(info.user_id);
        }
    }, []);
    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Семья
            </Heading>

            <div className={cls.current}>
                <div className={cls.avatar}>
                    <UserIcon />
                </div>
                <div className={cls.text}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        {username}
                    </Heading>
                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                        Вы
                    </Paragraph>
                </div>
            </div>

            <ul className={cls.list}>
                {data &&
                    data.map((item) => (
                        <li className={cls.listItem} key={item.id}>
                            <div className={cls.info}>
                                <div className={cls.avatar}>
                                    <UserIcon />
                                </div>
                                <div className={cls.text}>
                                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                                        {item.username}
                                    </Heading>
                                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                                        Возраст: {item.age} лет
                                    </Paragraph>
                                </div>
                            </div>
                            <div className={cls.some}>
                                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                                    {item.age > 17 ? 'Взрослый' : 'Ребенок'}
                                </Paragraph>
                            </div>
                        </li>
                    ))}
            </ul>
            {/*<div className={cls.linkMore}>*/}
            {/*    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H6}>*/}
            {/*        Пригласить в команду*/}
            {/*    </Heading>*/}
            {/*    <Plus />*/}
            {/*</div>*/}
        </div>
    );
};
