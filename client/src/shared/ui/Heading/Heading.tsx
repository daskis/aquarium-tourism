import { ColorEnum, IHeadingProps, SizeEnum } from '@shared/lib';
import { classNames } from '@shared/lib/utils';
import cls from './Heading.module.scss';

export const Heading = ({ size, color, children, className, ...props }: IHeadingProps) => {
    switch (size) {
        case SizeEnum.H1:
            return (
                <h1
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h1]: size === SizeEnum.H1,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h1>
            );
        case SizeEnum.H2:
            return (
                <h2
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h2]: size === SizeEnum.H2,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h2>
            );
        case SizeEnum.H3:
            return (
                <h3
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h3]: size === SizeEnum.H3,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h3>
            );
        case SizeEnum.H4:
            return (
                <h4
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h4]: size === SizeEnum.H4,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h4>
            );
        case SizeEnum.H5:
            return (
                <h5
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h5]: size === SizeEnum.H5,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h5>
            );
        case SizeEnum.H6:
            return (
                <h6
                    {...props}
                    className={classNames(
                        cls.heading,
                        {
                            [cls.h6]: size === SizeEnum.H6,
                            [cls.dark]: color === ColorEnum.DARK,
                            [cls.light]: color === ColorEnum.LIGHT,
                            [cls.danger]: color === ColorEnum.DANGER,
                            [cls.primary]: color === ColorEnum.PRIMARY,
                            [cls.secondary]: color === ColorEnum.SECONDARY,
                            [cls.success]: color === ColorEnum.SUCCESS,
                            [cls.link]: color === ColorEnum.LINK,
                        },
                        [className],
                    )}
                >
                    {children}
                </h6>
            );
    }
};
