import { useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Evita error si ya estaba prevenido
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function prepareApp() {
      try {
        await Asset.loadAsync([
          require('../assets/images/fondo.jpg'),
          require('../assets/images/logo2.png'),
        ]);
      } catch (error) {
        console.warn('Error cargando assets iniciales:', error);
      } finally {
        if (isMounted) {
          setIsAppReady(true);
        }
      }
    }

    prepareApp();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isAppReady) {
      SplashScreen.hideAsync().catch(() => {
        // Evita error si ya se ocultó
      });
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}