import {ColorEnum, SizeEnum} from "@shared/lib";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

export interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    size: SizeEnum;
    color: ColorEnum;
}