import cls from './UserLiked.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import ArchiveIcon from '@assets/icons/archiveIcon.svg';
import { useGetAllLocations } from '@features/location/lib';

interface IUserLiked {
    from: string;
    to: string;
    dateStart: string;
    dateEnd: string;
    id: string;
}

export const UserLiked = () => {
    const locations = useGetAllLocations();
    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Избранное
            </Heading>
            <ul className={cls.list}>
                {locations &&
                    locations.map((item) => {
                        if (item.in_favorites) {
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
                                            to={`/app/user/liked/${item.id}`}
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
