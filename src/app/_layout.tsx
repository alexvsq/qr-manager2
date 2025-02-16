import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function Layout() {

  const [loaded, error] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='dark' />
    </>
  );
}
