import { useEffect, useState } from 'react';
import { load } from '@2gis/mapgl';
import { MapWrapper } from '@widgets/ui';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { Map as MapType } from '@2gis/mapgl/types';

interface Marker {
    latitude: number;
    longitude: number;
}

// interface MapProps {
//     list?: Marker[];
// }

export const Map = () => {
    useEffect(() => {
        let map: MapType;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [39, 45],
                zoom: 10,
                key: 'a1893935-6834-4445-b97a-3405fb426c5b',
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};
