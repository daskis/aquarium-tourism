import { Heading, Paragraph } from '@shared/ui';
import { ColorEnum, SizeEnum } from '@shared/lib';
import Location from '@assets/icons/location.svg';
import cls from './LocationItem.module.scss';
import { ILocationItemProps } from '@widgets/lib';
import LocationImg from '@assets/img/location.jpg';

export const LocationItem = ({ id, title, description, city, price, status, handleChange }: ILocationItemProps) => {
    return (
        <li
            onClick={() => {
                handleChange(id);
            }}
            className={cls.wrapper}
        >
            <img className={cls.img} src={LocationImg} alt="locationImg" />
            <div className={cls.text}>
                <Heading className={cls.name} color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                    {title}
                </Heading>
                <Paragraph className={cls.location} color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                    <Location />
                    {city}
                </Paragraph>
            </div>
        </li>
    );
};
