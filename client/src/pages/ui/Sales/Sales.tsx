import cls from './Sales.module.scss';
import { SalesCard } from '@features/sales/ui';
import { Heading, Link, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';

export const Sales = () => {
    const list = [
        {
            category: 'Кафе и рестораны',
            count: 5,
        },
        {
            category: 'Отели',
            count: 10,
        },
        {
            category: 'АЗС и СТО',
            count: 8,
        },
    ];
    return (
        <div className={cls.wrapper}>
            <SalesCard />
            <Link size={SizeEnum.H3} color={ColorEnum.SECONDARY} to={'/some'}>
                Подробнее о бонусах {'>'}
            </Link>
            <Heading color={ColorEnum.PRIMARY} size={SizeEnum.H6}>
                Избранное
            </Heading>
            <ul className={cls.list}>
                {list.map((item) => (
                    <li key={item.category} className={cls.listItem}>
                        <div className={cls.info}>
                            <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                                Скидки от партнеров
                            </Paragraph>
                            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H6}>
                                {item.category}
                            </Heading>
                            <Link size={SizeEnum.H4} color={ColorEnum.LIGHT} to={'/some'}>
                                Подробнее
                            </Link>
                        </div>
                        <Heading color={ColorEnum.LIGHT} size={SizeEnum.H4} className={cls.circle}>
                            {item.count}%
                        </Heading>
                    </li>
                ))}
            </ul>
        </div>
    );
};
