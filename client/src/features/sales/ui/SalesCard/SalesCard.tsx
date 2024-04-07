import cls from './SalesCard.module.scss';
import { Heading, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { useState } from 'react';
import Cat from '@assets/img/cat.png';

export const SalesCard = () => {
    const [queestCount, setQueueCount] = useState(6);
    return (
        <div className={cls.wrapper}>
            <div className={cls.info}>
                <Heading color={ColorEnum.SECONDARY} size={SizeEnum.H3}>
                    Новичок
                </Heading>
                <img className={cls.img} src={Cat} alt="" />
            </div>
            <div className={cls.quests}>
                <div className={cls.background}>
                    <span style={{ width: `${queestCount}0%` }} className={cls.line}></span>
                </div>
                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                    Пройдено квестов {queestCount}/10
                </Paragraph>
            </div>
            <Paragraph className={cls.tooltip} color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                Выполняйте квесты и получайте приятные бонусы
            </Paragraph>
        </div>
    );
};
