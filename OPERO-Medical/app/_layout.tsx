import { Stack } from 'expo-router';
import 'react-native-reanimated';
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/app/libs/queryClient";

export default function RootLayout() {
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
