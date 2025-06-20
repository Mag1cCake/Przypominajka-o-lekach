import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

// Importy ekranów aplikacji
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';
import MedicationDetailScreen from './screens/MedicationDetailScreen';

// Ustawienie obsługi powiadomień
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stan logowania użytkownika

  useEffect(() => {
    // Listener do odbierania powiadomień
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Otrzymano powiadomienie:', notification);
    });

    // Czyszczenie listenera przy odmontowaniu komponentu
    return () => subscription.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" options={{ title: 'Przypominajka' }}>
              {props => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="AddMedication"
              component={AddMedicationScreen}
              options={{ title: 'Dodaj lek' }}
            />
            <Stack.Screen
              name="MedicationDetail"
              component={MedicationDetailScreen}
              options={{ title: 'Szczegóły leku' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}