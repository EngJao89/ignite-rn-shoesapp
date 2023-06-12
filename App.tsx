import { StatusBar, Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';

const oneSignalAppId = Platform.OS === 'ios' ? '2b542c58-e2e9-48f1-8bff-004caefe40c4' : 'bb68b7c0-8d9c-40f2-80e9-20a02124c7ff';
OneSignal.setAppId(oneSignalAppId);

OneSignal.setEmail('joao@email.com')

OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
})

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}