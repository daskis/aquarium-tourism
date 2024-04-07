import cls from './UserSteps.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import UserIcon from '@assets/icons/userIcon.svg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetStepsById } from '@features/location/lib';

interface IUserStep {
    img: string;
    title: string;
    interval: string[];
    status: string;
    coordinates: string[];
}

export const UserSteps = () => {
    const { id } = useParams();
    const { trigger, stepsData, steptLoading } = useGetStepsById();
    useEffect(() => {
        id ? trigger(id) : null;
    }, [id]);
    return (
        <ul className={cls.list}>
            {stepsData &&
                stepsData.map((item) => (
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
                                {`С ${item.array_interval.time_started} до ${item.array_interval.time_ended} `}
                            </Paragraph>
                        </div>
                        <div className={cls.link}>
                            <Link size={SizeEnum.H4} color={ColorEnum.SECONDARY} to={`/app/map/${item.id}`}>
                                На карте
                            </Link>
                        </div>
                    </li>
                ))}
        </ul>
    );
};
