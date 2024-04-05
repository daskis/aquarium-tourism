import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import { ColorEnum, SizeEnum } from '@shared/lib';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface IInputProps
    extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size' | 'onChange'> {
    label: string;
    size: SizeEnum;
    color: ColorEnum;
    name: string;
    register: UseFormRegisterReturn<string>;
    value: string | any;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: ReactNode;
}
