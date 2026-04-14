import { useMutation } from '@tanstack/react-query';
// Used destructuring to receive the object
export default function useAuthMutation({mutationKey, mutationFn, onSuccess, onError}: any) {
    const mutation = useMutation({
        mutationKey,
        mutationFn,
        onSuccess,
        onError,
    });

    return mutation;
}