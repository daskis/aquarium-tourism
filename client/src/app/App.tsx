import { classNames, useTheme } from '@shared/lib';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IAppProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const App = ({ children }: IAppProps) => {
    const { theme } = useTheme();

    return <div className={classNames('app', {}, [theme])}>{children}</div>;
};
