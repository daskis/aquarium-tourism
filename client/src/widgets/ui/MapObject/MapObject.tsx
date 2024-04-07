import cls from './MapObject.module.scss';
import { classNames, ColorEnum, SizeEnum } from '@shared/lib';
import Close from '@assets/icons/close.svg';
import { Heading, Paragraph } from '@shared/ui';

interface IMapObject {
    isOpen: boolean;
    handleChange: () => void;
    data: any;
}

export const MapObject = ({ isOpen, handleChange, data }: IMapObject) => {
    return (
        <div
            className={classNames(
                cls.wrapper,
                {
                    [cls.hidden]: !isOpen,
                },
                [],
            )}
        >
            <div className={cls.info}>
                <div
                    onClick={() => {
                        handleChange();
                    }}
                    className={cls.close}
                >
                    <Close />
                </div>
                <div className={cls.image}>{data?.image && <img src={data.image} alt="" />}</div>
                <div className={cls.text}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                        {data?.title}
                    </Heading>
                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H2}>
                        Дата начала: {data?.array_interval?.time_started}
                    </Paragraph>
                    <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H2}>
                        Дата окончания: {data?.array_interval?.time_ended}
                    </Paragraph>
                </div>
            </div>
        </div>
    );
};
