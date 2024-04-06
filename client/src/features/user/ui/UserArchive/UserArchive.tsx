import cls from './UserArchive.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import ArchiveIcon from '@assets/icons/archiveIcon.svg';

interface IUserArchive {
    from: string;
    to: string;
    dateStart: string;
    dateEnd: string;
    id: string;
}

export const UserArchive = () => {
    const list: IUserArchive[] = [
        {
            from: 'eblan1',
            to: 'eblan1',
            dateStart: '124',
            dateEnd: '124',
            id: 'rdfadfa',
        },
        {
            from: 'eblan1',
            to: 'eblan1',
            dateStart: '124',
            dateEnd: '124',
            id: 'rdfasdasadfa',
        },
    ];
    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                История путешествий
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
