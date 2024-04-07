import cls from './Home.module.scss';
import { Heading, Select } from '@shared/ui';
import { ColorEnum, Container, SelectItem, SizeEnum } from '@shared/lib';
import { useState } from 'react';
import { ILocationItemProps } from '@widgets/lib';
import { LocationItem } from '@/widgets/ui';
import { useGetAllLocations } from '@features/location/lib';
import { LocationModal } from '@features/location/ui';

export const Home = () => {
    const [selected, setSelected] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>();
    const handleChange = (id?: number) => {
        if (id) {
            setCurrentId(id);
        } else {
            setCurrentId(undefined);
        }
        setIsOpen(!isOpen);
    };
    const handleSelectChange = (value: string) => {
        setSelected(value);
    };
    const locations = useGetAllLocations();
    const selectItems: SelectItem[] = [
        {
            label: 'Рекомендации для вас',
            value: 'for_you',
        },
        {
            label: 'Популярные места',
            value: 'popular',
        },
        {
            label: 'Подборка сезона',
            value: 'season',
        },
        {
            label: 'Необычные места',
            value: 'Unusual',
        },
    ];

    return (
        <div className={cls.wrapper}>
            <Container>
                <div className={cls.titles}>
                    <Heading color={ColorEnum.LIGHT} size={SizeEnum.H4}>
                        Текст текст
                    </Heading>
                    <Heading color={ColorEnum.SECONDARY} size={SizeEnum.H4}>
                        текст.
                    </Heading>
                </div>
                <Select list={selectItems} onSelect={handleSelectChange} />
                <ul className={cls.list}>
                    {locations &&
                        locations.map((item: ILocationItemProps) => (
                            <LocationItem handleChange={handleChange} key={item.id} {...item} />
                        ))}
                </ul>
            </Container>
            <LocationModal isOpen={isOpen} handleChange={handleChange} id={currentId} />
        </div>
    );
};
