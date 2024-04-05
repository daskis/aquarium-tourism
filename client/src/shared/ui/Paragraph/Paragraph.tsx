import { ColorEnum, IParagraphProps, SizeEnum } from '@shared/lib';
import { classNames } from '@shared/lib/utils';
import cls from './Paragraph.module.scss';

export const Paragraph = ({ size, color, children, className, ...props }: IParagraphProps) => {
    return (
        <p
            className={classNames(
                cls.p,
                {
                    [cls.h1]: size === SizeEnum.H1,
                    [cls.h2]: size === SizeEnum.H2,
                    [cls.h3]: size === SizeEnum.H3,
                    [cls.h4]: size === SizeEnum.H4,
                    [cls.h5]: size === SizeEnum.H5,
                    [cls.h6]: size === SizeEnum.H6,

                    [cls.primary]: color === ColorEnum.PRIMARY,
                    [cls.secondary]: color === ColorEnum.SECONDARY,
                    [cls.danger]: color === ColorEnum.DANGER,
                    [cls.link]: color === ColorEnum.LINK,
                    [cls.success]: color === ColorEnum.SUCCESS,
                    [cls.dark]: color === ColorEnum.DARK,
                    [cls.light]: color === ColorEnum.LIGHT,
                },
                [className],
            )}
            {...props}
        >
            {children}
        </p>
    );
};
