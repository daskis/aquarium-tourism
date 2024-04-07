import { useLazyGetChildrenQuery } from '@features/user/lib';

export const useGetChildren = () => {
    const [childTrigger, { data }] = useLazyGetChildrenQuery();

    const trigger = async (id: string) => {
        await childTrigger(id);
    };

    return { trigger, data };
};
