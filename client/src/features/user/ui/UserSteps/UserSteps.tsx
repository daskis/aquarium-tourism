import cls from './UserSteps.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import UserIcon from '@assets/icons/userIcon.svg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface IUserStep {
    img: string;
    title: string;
    interval: string[];
    status: string;
    coordinates: string[];
}

export const UserSteps = () => {
    const params = useParams();
    useEffect(() => {
        console.log(params);
    }, [params]);
    const list: IUserStep[] = [
        {
            img: 'asfgwasfs',
            title: 'asfgwasfs',
            interval: ['asfgwasfs', 'fvsg'],
            status: 'asfgwasfs',
            coordinates: ['asfgwasfs', 'asfgwasfs'],
        },
        {
            img: 'asfgwasfs',
            title: 'asfgwasfs',
            interval: ['asfgwasfs', 'fvsg'],
            status: 'asfgwasfs',
            coordinates: ['asfgwasfs', 'asfgwasfs'],
        },
    ];
    return (
        <ul className={cls.list}>
            {list.map((item) => (
                <li className={cls.listItem} key={item.img}>
                    <div className={cls.avatar}>
                        {/*<img src="" alt="" />*/}
                        <UserIcon />
                    </div>
                    <div className={cls.info}>
                        <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                            {item.title}
                        </Heading>
                        <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                            {item.interval.length > 1
                                ? `С ${item.interval[0]} до ${item.interval[1]}`
                                : item.interval[0]}
                        </Paragraph>
                    </div>
                    <div className={cls.link}>
                        <Link size={SizeEnum.H4} color={ColorEnum.SECONDARY} to={'/some'}>
                            Подробнее
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};
