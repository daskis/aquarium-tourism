import { useLazyGetStepByIdQuery } from '@features/location/lib';

export const useGetStepById = () => {
    const [stepTrigger, { data: stepData, isLoading: steptLoading }] = useLazyGetStepByIdQuery();

    const trigger = async (id: number) => {
        await stepTrigger(id);
    };

    return {
        trigger,
        stepData,
        steptLoading,
    };
};
