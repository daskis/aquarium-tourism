import { DetailedHTMLProps, HTMLAttributes } from 'react';

export enum StatusEnum {
    DONE = 'done',
    NOT_ACTIVE = 'not_active',
    PENDING = 'pending',
}

export interface ILocationItemProps
    extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'> {
    id: number;
    title: string;
    description: string;
    city: string;
    price: number;
    status: StatusEnum;
    handleChange: (id: number) => void;
}

export interface IStepsProps extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'> {}
