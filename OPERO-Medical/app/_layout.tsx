import {router, Stack} from 'expo-router';
import 'react-native-reanimated';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/app/libs/queryClient";
import {useEffect} from "react";
import {getSecure} from "@/services/storage.service";

export default function RootLayout() {
    useEffect(() => {
        const checkAuth = async () => {
            const token = await getSecure('token');
            const biometricEnabled = await getSecure('biometricEnabled');

            if (token && biometricEnabled === 'true') {
                const { getCachedUser } = await import('@/services/user.service');
                const user = await getCachedUser() as any;
                router.replace(user?.role === 'doctor' ? '/(app)/appointments' : '/(app)/doctors');
            }
        };

        checkAuth();
    }, []);
  return (
    <>
        <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(app)" />
            </Stack>
        </QueryClientProvider>
    </>
  );
}
