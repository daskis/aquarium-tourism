import cls from './UserActions.module.scss';
import { Button, Heading, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import Tent from '@assets/icons/tent.png';

export const UserActions = () => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.nearest}>
                <div className={cls.img}>
                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                        12 апреля 9:00
                        <img src={Tent} alt="icon" />
                    </Paragraph>
                </div>
                <div className={cls.booking}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        Ближайшее бронирование
                    </Heading>
                    <Heading style={{ textTransform: 'uppercase' }} color={ColorEnum.SECONDARY} size={SizeEnum.H7}>
                        НАЗВАНИЕ МЕСТА
                    </Heading>
                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                        Адрес адрес адрес адрес
                    </Paragraph>
                </div>
            </div>
            <Button size={SizeEnum.H2} color={ColorEnum.PRIMARY}>
                СМОТРЕТЬ ВЕСЬ МАРШРУТ
            </Button>
            <ul className={cls.list}>
                <li className={cls.listItem}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        ПИТСТОП
                    </Heading>
                </li>
                <li className={cls.listItem}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        ХАБ
                    </Heading>
                </li>
                <li className={cls.listItem}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        РЕЗОРТ
                    </Heading>
                </li>
            </ul>
            <ul className={cls.other}>
                <li className={cls.otherItem}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        ЭКСКУРСИИ
                        <Button size={SizeEnum.H4} color={ColorEnum.SECONDARY}>
                            Подобрали по Вашему маршруту
                        </Button>
                    </Heading>
                </li>
                <li className={cls.otherItem}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                        УСЛУГИ
                    </Heading>
                </li>
            </ul>
        </div>
    );
};
