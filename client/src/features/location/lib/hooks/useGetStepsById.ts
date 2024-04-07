import { useLazyGetStepsByIdQuery } from '@features/location/lib';

export const useGetStepsById = () => {
    const [stepsTrigger, { data: stepsData, isLoading: steptLoading }] = useLazyGetStepsByIdQuery();

    const trigger = async (id: number) => {
        await stepsTrigger(id);
    };

    return {
        trigger,
        stepsData,
        steptLoading,
    };
};
