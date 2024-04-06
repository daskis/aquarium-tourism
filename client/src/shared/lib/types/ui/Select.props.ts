export interface SelectItem {
    label: string;
    value: string;
}

export interface ISelectProps {
    list: SelectItem[];
    onSelect: (value: string) => void;
}
