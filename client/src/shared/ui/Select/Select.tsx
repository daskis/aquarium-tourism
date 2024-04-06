import { useState } from 'react';
import cls from './Select.module.scss';
import { classNames, ColorEnum, ISelectProps, SizeEnum } from '@shared/lib';
import SelectArrow from '@assets/icons/selectArrow.svg';
import { Paragraph } from '@shared/ui';

export const Select = ({ list, onSelect }: ISelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const handleItemClick = (item: { label: string; value: string }) => {
        onSelect(item.value);
        setSelectedValue(item.value);
        setIsOpen(false);
    };

    const handleSelectClick = () => {
        setIsOpen((prevState) => !prevState);
    };
    return (
        <div className={cls.wrapper}>
            <div onClick={handleSelectClick} className={cls.button}>
                <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H3}>
                    {selectedValue ? list.find((item) => item.value === selectedValue)?.label : 'Выберите место'}
                </Paragraph>
                <span
                    className={classNames(
                        cls.arrow,
                        {
                            [cls.active]: isOpen,
                        },
                        [],
                    )}
                >
                    <SelectArrow />
                </span>
            </div>
            <ul className={classNames(cls.list, { [cls.open]: isOpen }, [])}>
                {list.map((item) => (
                    <li className={cls.item} key={item.value} onClick={() => handleItemClick(item)}>
                        <Paragraph color={ColorEnum.LIGHT} size={SizeEnum.H3}>
                            {item.label}
                        </Paragraph>
                    </li>
                ))}
            </ul>
        </div>
    );
};
