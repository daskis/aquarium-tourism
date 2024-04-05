import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { ColorEnum, SizeEnum } from '@shared/lib';

export interface ILinkProps extends DetailedHTMLProps<HTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
    size: SizeEnum;
    color: ColorEnum;
    children: ReactNode;
    to: string;
}
