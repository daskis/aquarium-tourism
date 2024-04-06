import cls from './Home.module.scss';
import { Heading, Select } from '@shared/ui';
import { ColorEnum, Container, SelectItem, SizeEnum } from '@shared/lib';
import { useState } from 'react';
import LocationImg from '@assets/img/location.jpg';
import { ILocationItemProps } from '@widgets/lib';
import { LocationItem } from '@/widgets/ui';

export const Home = () => {
    const [selected, setSelected] = useState<string>();
    const handleSelectChange = (value: string) => {
        setSelected(value);
    };
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

    const locationList: ILocationItemProps[] = [
        {
            location: 'Жопа1',
            name: 'Жопа1',
            img: LocationImg,
        },
        {
            location: 'Жопа2',
            name: 'Жопа2',
            img: LocationImg,
        },
        {
            location: 'Жопа3',
            name: 'Жопа3',
            img: LocationImg,
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
                    {locationList.map((item) => (
                        <LocationItem key={item.location} location={item.location} img={item.img} name={item.name} />
                    ))}
                </ul>
            </Container>
        </div>
    );
};
