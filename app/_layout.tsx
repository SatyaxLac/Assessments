import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient } from '@/services/queryClient';
import { colors } from '@/theme';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout() {
  const segments = useSegments();
  const isLogin = segments[0] === 'login';

  const content = (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: isLogin ? '#FFFFFF' : colors.background },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="eligibility" options={{ presentation: 'modal' }} />
      <Stack.Screen name="marketplace/product/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="marketplace/checkout" options={{ presentation: 'card' }} />
    </Stack>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style={Platform.OS === 'web' ? 'light' : 'dark'} />
        {Platform.OS === 'web' ? (
          isLogin ? (
            <View style={styles.fullScreen}>{content}</View>
          ) : (
            <View style={styles.webContainer}>
              <View style={styles.phoneFrame}>{content}</View>
            </View>
          )
        ) : (
          content
        )}
      </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  webContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  phoneFrame: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    backgroundColor: colors.background,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderRightWidth: Platform.OS === 'web' ? 1 : 0,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
});
