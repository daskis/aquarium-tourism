import cls from './UserBasket.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import ArchiveIcon from '@assets/icons/archiveIcon.svg';
import Fly from '@assets/icons/fly.svg';
import { useGetAllLocations } from '@features/location/lib';

interface IUserBasket {
    from: string;
    to: string;
    dateStart: string;
    dateEnd: string;
    id: string;
}

export const UserBasket = () => {
    const locations = useGetAllLocations();

    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Ближайшее путешествия
            </Heading>
            {/*<Link className={cls.mapLink} size={SizeEnum.H1} color={ColorEnum.SECONDARY} to={'/some'}>*/}
            {/*    Маршрут на карте&nbsp;*/}
            {/*    <Fly />*/}
            {/*</Link>*/}
            <ul className={cls.list}>
                {locations &&
                    locations.map((item) => {
                        if (item.status === 'pending') {
                            return (
                                <li className={cls.listItem} key={item.id}>
                                    <div className={cls.info}>
                                        <div className={cls.avatar}>
                                            <ArchiveIcon />
                                        </div>
                                        <div className={cls.text}>
                                            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                                                {item.title}
                                            </Heading>
                                            <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                                                {item.city}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <div className={cls.some}>
                                        <Link
                                            size={SizeEnum.H5}
                                            color={ColorEnum.SECONDARY}
                                            to={`/app/user/basket/${item.id}`}
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </li>
                            );
                        }
                    })}
            </ul>
        </div>
    );
};
