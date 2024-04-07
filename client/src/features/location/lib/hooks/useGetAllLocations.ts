import { useGetAllLocationsQuery } from '@features/location/lib';
import { useEffect, useState } from 'react';

export const useGetAllLocations = () => {
    const { data, error } = useGetAllLocationsQuery(null);
    const [locations, setLocations] = useState();
    useEffect(() => {
        if (data) {
            setLocations(data);
        }
        if (error) {
            console.log(error);
        }
    }, [data, error]);

    return locations;
};
