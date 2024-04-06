import { Heading, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import Location from '@assets/icons/location.svg';
import cls from './LocationItem.module.scss';
import { ILocationItemProps } from '@widgets/lib';

export const LocationItem = ({ location, img, name }: ILocationItemProps) => {
    return (
        <li className={cls.wrapper}>
            <img className={cls.img} src={img} alt="locationImg" />
            <div className={cls.text}>
                <Heading className={cls.name} color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                    {name}
                </Heading>
                <Paragraph className={cls.location} color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                    <Location />
                    {location}
                </Paragraph>
            </div>
        </li>
    );
};
