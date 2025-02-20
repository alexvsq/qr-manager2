import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native'
import { COLORS } from '@/utils/constants'
import '@/i18n/i18n'

export default function Layout() {

  Platform.OS === 'android' && NavigationBar.setBackgroundColorAsync(COLORS.blackBg);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
          },
          headerTintColor: COLORS.blackBg,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: COLORS.whiteBg,
          },
          contentStyle: {
            backgroundColor: COLORS.blackBg
          }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style='dark' />
    </GestureHandlerRootView>
  );
}
