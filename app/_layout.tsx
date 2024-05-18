/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import '../global.css';
import { AppProvider } from '~/context/appContext';

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="[id]"
          options={{ headerShown: true, headerTitle: 'Restaurant Details' }}
        />
        <Stack.Screen
          name="modalFood"
          options={{
            presentation: 'modal',
            headerTitle: '',
            headerTransparent: true,
            headerRight: () => (
              <TouchableOpacity
                style={{ backgroundColor: '#fff', borderRadius: 20, padding: 2 }}
                onPress={() => navigation.goBack()}>
                <Ionicons name="close-outline" size={30} color="#5a5a5a" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="modalAddress"
          options={{
            presentation: 'modal',
            title: 'Delivery address',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="restaurantDetails"
          options={{
            title: '',
            headerShown: false,
          }}
        />
      </Stack>
    </AppProvider>
  );
}
