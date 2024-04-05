import { ColorEnum, SizeEnum } from '@shared/lib';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IParagraphProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
    color: ColorEnum;
    size: SizeEnum;
}
