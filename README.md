# Przypominajka o lekach

## Autorzy

**Yevhenii Yarmak** (44105)  
**Denys Sirochuk** (44087)

## Opis projektu

Aplikacja mobilna „Przypominajka o lekach” jest przeznaczona dla użytkowników, którzy chcą efektywnie zarządzać harmonogramem przyjmowania leków. Umożliwia dodawanie przypomnień o lekach, edycję szczegół otrzymywanie powiadomień.

---

## Technologie

- **React Native** – framework do tworzenia aplikacji mobilnych
- **Expo** – platforma do szybkiego uruchamiania i testowania aplikacji
- **AsyncStorage** – lokalne przechowywanie danych
- **React Navigation** – obsługa nawigacji między ekranami
- **expo-notifications** – obsługa powiadomień lokalnych
- **UUID** – generowanie unikalnych identyfikatorów leków
- **DateTimePicker** – wybór godziny przyjmowania leków
- **Jest** + **React Native Testing Library** – testy jednostkowe

---

## Funkcjonalności

- **Ekran logowania (proste logowanie z weryfikacją danych)**
- **Lista zapisanych leków**
- **Dodawanie, edytowanie i usuwanie leków**
- **Zaplanowane powiadomienia o przyjęciu leku**
- **Szczegóły leku po kliknięciu**
- **Przechowywanie danych w pamięci lokalnej (AsyncStorage)** 
- **Podstawowe testy jednostkowe komponentów**

---

## Instrukcja uruchomienia projektu

- **Klonuj repozytorium:**
    git clone https://github.com/twoj-uzytkownik/nazwa-projektu.git
    cd nazwa-projektu

- **Zainstaluj zależności:**
    - npm install
    - npm install @react-navigation/native @react-navigation/native-stack
    - npm install @react-native-async-storage/async-storage
    - npm install expo-notifications
    - npm install react-native-uuid
    - npm install @react-native-community/datetimepicker
    - npm install react-native-safe-area-context
    - npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-svg

- **Uruchomienie projektu**
    npx expo start

*Aby pomyślnie się zalogować, należy wpisać login użytkownika i hasło 1234*

- **Zależności do testowania komponentów**

npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-svg

npx jest