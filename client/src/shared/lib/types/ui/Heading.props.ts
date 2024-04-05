import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ColorEnum, SizeEnum } from '@shared/lib';

export interface IHeadingProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    color: ColorEnum;
    size: SizeEnum;
}
