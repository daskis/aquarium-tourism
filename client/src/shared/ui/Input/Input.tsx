import React, { useEffect, useState } from 'react';
import { classNames, ColorEnum, IInputProps, SizeEnum } from '@shared/lib';
import cls from './Input.module.scss';

export const Input = ({
    type,
    color = ColorEnum.PRIMARY,
    size,
    label,
    register,
    className,
    value,
    onChange,
    children,
    name,
    ...props
}: IInputProps) => {
    const [inputValue, setInputValue] = useState(value || '');

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        onChange(event);
    };
    return (
        <div className={cls.wrapper}>
            <input
                type={type}
                value={inputValue}
                onChange={handleChange}
                name={name}
                className={classNames(
                    cls.input,
                    {
                        [cls.primary]: color === ColorEnum.PRIMARY,
                        // [cls.secondary]: color === ColorEnum.SECONDARY,

                        [cls.h1]: size === SizeEnum.H1,
                        [cls.h2]: size === SizeEnum.H2,
                        [cls.h3]: size === SizeEnum.H3,
                        [cls.h4]: size === SizeEnum.H4,
                        [cls.h5]: size === SizeEnum.H5,
                        [cls.h6]: size === SizeEnum.H6,
                    },
                    [className],
                )}
                {...props}
            />
            <p
                className={classNames(
                    cls.label,
                    {
                        [cls.labelWhite]: color === ColorEnum.PRIMARY,
                        // [cls.labelWhite]: color === ColorEnum.SECONDARY,
                        [cls.p1]: size === SizeEnum.H1,
                        [cls.p2]: size === SizeEnum.H2,
                        [cls.p3]: size === SizeEnum.H3,
                        [cls.p4]: size === SizeEnum.H4,
                        [cls.p5]: size === SizeEnum.H5,
                        [cls.p6]: size === SizeEnum.H6,
                    },
                    [],
                )}
            >
                {label}
            </p>
        </div>
    );
};
