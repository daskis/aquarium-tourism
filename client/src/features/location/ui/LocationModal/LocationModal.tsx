import cls from './LocationModal.module.scss';
import { useEffect, useRef } from 'react';
import { ILocationModalProps, useGetLocation } from '@features/location/lib';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import Close from '@assets/icons/close.svg';
import LocationImg from '@assets/img/location.jpg';
import { Button, Heading, Link, Paragraph } from '@shared/ui';
import Location from '@assets/icons/location.svg';
import Loader from '@assets/icons/loader.svg';
import UserIcon from '@assets/icons/userIcon.svg';

export const LocationModal = ({ id, isOpen, handleChange }: ILocationModalProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { trigger, stepsData, locationData } = useGetLocation();
    useEffect(() => {
        if (id) {
            trigger(id);
        }
    }, [id]);
    const handleClick = () => {
        handleChange(id);
    };
    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (e.target === wrapperRef.current) {
            handleChange(id);
        }
    };
    useEffect(() => {
        const handleEscKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleChange(id);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKeyPress);
        } else {
            document.removeEventListener('keydown', handleEscKeyPress);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [isOpen, handleChange]);

    return (
        <div
            ref={wrapperRef}
            className={classNames(
                cls.wrapper,
                {
                    [cls.hidden]: !isOpen,
                },
                [],
            )}
        >
            <div onClick={handleWrapperClick} className={cls.body}>
                <span
                    onClick={() => {
                        handleClick();
                    }}
                    className={cls.close}
                >
                    <Close />
                </span>
                {}
                {stepsData ? (
                    <div className={cls.info}>
                        <img className={cls.img} src={LocationImg} alt="locationImg" />
                        <div className={cls.titleInfo}>
                            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                                {locationData.title}
                            </Heading>
                            <Heading color={ColorEnum.LIGHT} size={SizeEnum.H5}>
                                {locationData.price}₽
                            </Heading>
                        </div>
                        <Paragraph className={cls.location} color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                            <Location />
                            {locationData.city}
                        </Paragraph>
                        <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H6}>
                            {locationData.description}
                        </Paragraph>
                        <ul className={cls.list}>
                            {stepsData.map((item) => (
                                <li className={cls.listItem} key={item.id}>
                                    <div className={cls.listItemImg}>
                                        <UserIcon />
                                    </div>
                                    <div className={cls.listItemInfo}>
                                        <Heading color={ColorEnum.LIGHT} size={SizeEnum.H7}>
                                            {item.title}
                                        </Heading>
                                        <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                                            {`С ${item.array_interval.time_started} до ${item.array_interval.time_ended}`}
                                        </Paragraph>
                                    </div>
                                    <div className={cls.map}>
                                        <Link to={`/app/map/${item.id}`} size={SizeEnum.H5} color={ColorEnum.SECONDARY}>
                                            на карте
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Button size={SizeEnum.H4} color={ColorEnum.SECONDARY}>
                            Забронировать
                        </Button>
                    </div>
                ) : (
                    <div className={cls.loader}>
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};
