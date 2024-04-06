import cls from './UserFamily.module.scss';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import UserIcon from '@assets/icons/userIcon.svg';
import Plus from '@assets/icons/plus.svg';

interface IFamilyMember {
    firstName: string;
    lastName: string;
    age: number;
    id: string;
    img: string;
}

export const UserFamily = () => {
    const list: IFamilyMember[] = [
        {
            firstName: 'eblan1',
            lastName: 'eblan1',
            age: 124,
            id: '124',
            img: 'rdfadfa',
        },
        {
            firstName: 'eblan2',
            lastName: 'eblan2',
            age: 12,
            id: '12124',
            img: 'rdfadfa',
        },
    ];
    return (
        <div className={cls.wrapper}>
            <Heading className={cls.title} color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Семья
            </Heading>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li className={cls.listItem} key={item.id}>
                        <div className={cls.info}>
                            <div className={cls.avatar}>
                                <UserIcon />
                            </div>
                            <div className={cls.text}>
                                <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                                    {item.lastName} {item.firstName}
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
                            <Link size={SizeEnum.H5} color={ColorEnum.SECONDARY} to={item.id}>
                                Смотреть аккаунт
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <div className={cls.linkMore}>
                <Heading color={ColorEnum.LIGHT} size={SizeEnum.H6}>
                    Пригласить в семью
                </Heading>
                <Plus />
            </div>
        </div>
    );
};
