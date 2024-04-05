import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { classNames } from '@shared/lib/utils';

interface IContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Container = ({ children, className }: IContainerProps) => {
    return <div className={classNames('max-w-main px-4 mx-auto w-full', {}, [className])}>{children}</div>;
};
