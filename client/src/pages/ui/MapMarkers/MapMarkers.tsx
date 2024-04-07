import { useEffect, useState } from 'react';
import { load } from '@2gis/mapgl';
import { MapObject, MapWrapper } from '@widgets/ui';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { useGetStepById } from '@features/location/lib';
import { useParams } from 'react-router-dom';

export const MapMarkers = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleChange = () => {
        setIsOpen(!isOpen);
    };
    const { id } = useParams();
    const { trigger, stepData, steptLoading } = useGetStepById();
    useEffect(() => {
        if (id) {
            trigger(id);
        }
        let map;
        if (stepData) {
            load().then((mapglAPI) => {
                map = new mapglAPI.Map('map-container', {
                    center: [stepData?.coordinates.latitude, stepData.coordinates.longitude],
                    zoom: 10,
                    key: 'a1893935-6834-4445-b97a-3405fb426c5b',
                });
                const markers = [{ coordinates: [stepData.coordinates.latitude, stepData.coordinates.longitude] }];
                const clusterer = new Clusterer(map);
                clusterer.load(markers);
                clusterer.on('click', (event) => {
                    if (event.target.type === 'cluster') {
                        console.log(event.target.userData);
                    } else {
                        setIsOpen(!isOpen);
                        console.log(event.target.data);
                    }
                });
            });
        }

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, [stepData]);
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <MapWrapper />
            <MapObject isOpen={isOpen} handleChange={handleChange} data={stepData} />
        </div>
    );
};
