import cls from './UserLiked.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import ArchiveIcon from '@assets/icons/archiveIcon.svg';

interface IUserLiked {
    from: string;
    to: string;
    dateStart: string;
    dateEnd: string;
    id: string;
}

export const UserLiked = () => {
    const list: IUserLiked[] = [
        {
            from: 'lorem',
            to: 'lorem',
            dateStart: '10.10.2001',
            dateEnd: '10.11.2001',
            id: 'rdfadfa',
        },
        {
            from: 'lorem',
            to: 'lore,',
            dateStart: '11.10.2001',
            dateEnd: '11.11.2001',
            id: 'rdfasdasadfa',
        },
    ];
    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Избранное
            </Heading>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li className={cls.listItem} key={item.id}>
                        <div className={cls.info}>
                            <div className={cls.avatar}>
                                <ArchiveIcon />
                            </div>
                            <div className={cls.text}>
                                <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                                    Маршрут {item.from} - {item.to}
                                </Heading>
                                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                                    c {item.dateStart} до {item.dateEnd}
                                </Paragraph>
                            </div>
                        </div>
                        <div className={cls.some}>
                            <Link size={SizeEnum.H5} color={ColorEnum.SECONDARY} to={item.id}>
                                Подробнее
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
