import { Link as RouterLink } from 'react-router-dom';
import cls from './Link.module.scss';
import { classNames, ColorEnum, ILinkProps, SizeEnum } from '@shared/lib';

export const Link = ({ size, color, to, children, className }: ILinkProps) => {
    return (
        <RouterLink
            to={to}
            className={classNames(
                cls.main,
                {
                    // COLORS
                    [cls.link]: color === ColorEnum.LINK,
                    [cls.primary]: color === ColorEnum.PRIMARY,
                    [cls.dark]: color === ColorEnum.DARK,
                    [cls.light]: color === ColorEnum.LIGHT,

                    // SIZE
                    [cls.h1]: size === SizeEnum.H1,
                    [cls.h2]: size === SizeEnum.H2,
                    [cls.h3]: size === SizeEnum.H3,
                    [cls.h4]: size === SizeEnum.H4,
                    [cls.h5]: size === SizeEnum.H5,
                    [cls.h6]: size === SizeEnum.H6,
                },
                [className],
            )}
        >
            {children}
        </RouterLink>
    );
};
