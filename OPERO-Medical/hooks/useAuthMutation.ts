import { useMutation } from '@tanstack/react-query';
export default function useAuthMutation({mutationKey, mutationFn, onSuccess, onError}: any) {
    const mutation = useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
    });

    return mutation;
}
