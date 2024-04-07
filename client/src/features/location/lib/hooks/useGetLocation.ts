import { useLazyGetLocationByIdQuery, useLazyGetStepsByIdQuery } from '@features/location/lib';

export const useGetLocation = () => {
    const [locationTrigger, { data: locationData, isLoading: locationLoading }] = useLazyGetLocationByIdQuery();
    const [stepsTrigger, { data: stepsData, isLoading: steptLoading }] = useLazyGetStepsByIdQuery();

    const trigger = async (id: number) => {
        await locationTrigger(id);
        await stepsTrigger(id);
    };

    return {
        trigger,
        locationData,
        stepsData,
        locationLoading,
        steptLoading,
    };
};
