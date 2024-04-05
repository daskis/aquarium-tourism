import { ColorEnum, IButtonProps, SizeEnum } from '@shared/lib';
import { classNames } from '@shared/lib/utils';
import { Paragraph } from '@shared/ui';
import cls from './Button.module.scss';

export const Button = ({ size, color, type, children, className, ...props }: IButtonProps) => {
    return (
        <button
            {...props}
            className={classNames(
                cls.button,
                {
                    [cls.h1]: size === SizeEnum.H1,
                    [cls.h2]: size === SizeEnum.H2,
                    [cls.h3]: size === SizeEnum.H3,
                    [cls.h4]: size === SizeEnum.H4,
                    [cls.h5]: size === SizeEnum.H5,
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
            type={type}
        >
            <Paragraph color={color === ColorEnum.LIGHT ? ColorEnum.DARK : ColorEnum.LIGHT} size={size}>
                {children}
            </Paragraph>
        </button>
    );
};
