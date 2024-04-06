import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { classNames } from '@shared/lib/utils';
import cls from './Container.module.scss';
interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container = ({ children, className }: IContainerProps) => {
    return <div className={classNames(cls.container, {}, [className])}>{children}</div>;
};
