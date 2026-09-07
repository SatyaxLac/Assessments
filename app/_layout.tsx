import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '@/services/queryClient';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="marketplace/product/[id]" options={{ presentation: 'card' }} />
          <Stack.Screen name="marketplace/checkout" options={{ presentation: 'card' }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
