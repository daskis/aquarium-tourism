import { mainApi } from '@shared/lib/store/api';
import { ILocationItemProps } from '@widgets/lib';
import { LocationEnum } from '@features/location/lib';

export const locationApi = mainApi.injectEndpoints({
    endpoints: (build) => ({
        getAllLocations: build.query<ILocationItemProps[], null>({
            query: () => ({
                url: `/travels/locations`,
                method: 'GET',
            }),
        }),
        getLocationById: build.query({
            query: (id: number) => ({
                url: `/travels/locations/${id}`,
                method: 'GET',
            }),
        }),
        getLocation: build.query({
            query: (type: LocationEnum) => ({
                url: `/travels/facility/${type}/retrive/`,
                method: 'GET',
            }),
        }),
        getStepsById: build.query({
            query: (id: number) => ({
                url: `/travels/step/${id}/retrive/`,
                method: 'GET',
            }),
        }),
        getStepById: build.query({
            query: (id: number) => ({
                url: `/travels/step/${id}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAllLocationsQuery,
    useLazyGetLocationByIdQuery,
    useLazyGetStepByIdQuery,
    useLazyGetStepsByIdQuery,
    useLazyGetLocationQuery,
} = locationApi;
