🍋 **Little Lemon — Component Documentation**

This document describes the architecture, screens, reusable components, ViewModels, services, and navigation structure of the Little Lemon React Native application. It is based on the current Visual Studio Code project structure shown in the application screenshot.

1. **Project Structure**

```text
little-lemon/
├── assets/
│   ├── Fonts/
│   └── Images
│
├── Model/
│   ├── Cartservices.js
│   ├── DataBase_AsyncStorage.js
│   └── DataBase_SQLite.js
│
├── View/
│   ├── components/
│   └── screens/
│   │   ├── Button.js
│   │   ├── Filter.js
│   │   ├── Header.js
│   │   ├── Optionselector.js
│   │   └── Quantityselector.js
│   │
│   └── screens/
│       ├── Cartscreen.js
│       ├── Dishdetailscreen.js
│       ├── ForgotPasswordScreen.js
│       ├── Home.js
│       ├── Onboarding.js
│       └── Profile.js
│
├── ViewModel/
│   ├── AuthContext.js
│   ├── Onboardingviewmodel.js
│   ├── Usedishdetails.js
│   ├── Utils.js
│   └── Vm_profile.js
│
├── App.js
├── app.json
├── package.json
└── README.md
```

2. **Navigation Architecture**

The application uses React Navigation with both Stack Navigator and Bottom Tab Navigator.

Main Navigation Features:

•	LoginStackNavigator handles onboarding and authentication flow.
•	HomeStack manages the main application screens.
•	BottomTabNavigator allows switching between Home, Cart, Login and Profile sections.
•	NavigationContainer wraps the entire application.
•	QueryClientProvider from React Query manages asynchronous data requests.

3. **Screens**

**Onboarding Screen**
This is displayed when the user selects the ‘Log in’ option from the menu to access the section. It collects user information, such as their name and email address, and either confirms the account or directs them to create a profile.

**Home Screen**
Main application screen. Displays the restaurant presentation, search bar, menu filters, and available dishes.

**Dish Detail Screen**
Displays detailed information about a selected dish including price, ingredients, customization options, and quantity selector.

**Cart Screen**
Displays all selected dishes added to the shopping cart. Allows users to update quantities and review the final order total.

**Profile Screen**
Allows the user to manage personal information, profile image, and notification preferences. Create of Profile from user.

**Forgot Password Screen**
Allows users to recover, if they forget their password.

4. **Reusable Components**

**Button.js**
Reusable customizable button component used across forms and actions.

**Filter.js**
Displays selectable categories or filters to dynamically filter menu items.

**Header.js**
Reusable header component that displays the Little Lemon logo and optional profile image.

**Optionselector.js**
Allows users to select additional ingredients  for dishes.

**Quantityselector.js**
Allows users to increase or decrease the quantity of dishes before adding them to the cart.

5. **ViewModels and State Management**

**AuthContext.js**
Global authentication context used to manage login state, current user session, and authentication persistence.

**Onboardingviewmodel.js**
Contains business logic related to onboarding and user registration.

**Usedishdetails.js**
Custom hook that manages dish details, selected options, and quantity.

**Vm_profile.js**
Handles profile data updates, validation, and persistence.

**Utils.js**
It includes additional features to make the search process easier using two methods: filters and a search bar.

6. **Data Persistence and Services**

**DataBase_AsyncStorage.js**
Handles local persistent storage using AsyncStorage. Stores user session data, profile information, and onboarding completion status.

**DataBase_SQLite.js**
Provides local SQLite database functionality for menu data and structured local storage.

**Cartservices.js**
Contains shopping cart business logic such as adding products, removing products, updating quantities, and calculating totals.

7. **UI Components and Libraries**

**FlatList**
A React Native component used to efficiently render large lists of data. It optimizes memory usage by rendering only the visible items on the screen. In this application, it is used to display menu dishes and shopping cart products.

**TouchableOpacity**
A wrapper component that makes elements touchable. When pressed, it reduces its opacity to provide visual feedback to the user. It is used for buttons, menu selections, and navigation actions.

**ScrollView**
A component that enables scrolling through content when it exceeds the screen size. It is used in screens that contain forms, profile information, or long content sections.

**SafeAreaView**
A React Native component that ensures content is displayed within the safe boundaries of a device screen, avoiding overlaps with notches, status bars, or rounded corners.

**SearchBar**
A reusable search component that allows users to filter menu items dynamically by entering keywords. It improves usability and navigation through the menu catalog.

**SectionList**
A React Native component used to display grouped lists with section headers. It is utilized to organize menu items by categories such as appetizers, main courses, and desserts.

**TextInput**
A basic React Native component that allows users to enter and edit text. It is used in login, registration, profile, and search forms.

**MaskedTextInput**
A specialized text input component that automatically formats user input according to predefined patterns. It is used for fields such as phone numbers, identification numbers, or formatted personal information.

**Material Community Icons**
An icon library that provides a large collection of customizable icons. The application uses these icons to enhance navigation, buttons, menu categories, shopping cart actions, and user interface feedback.


| Component                | Purpose                  | Usage in Application         |
| ------------------------ | ------------------------ | ---------------------------- |
| FlatList                 | Efficient list rendering | Menu items and cart products |
| TouchableOpacity         | Touch interaction        | Buttons and actions          |
| ScrollView               | Scrollable content       | Forms and long screens       |
| SafeAreaView             | Safe screen layout       | Main screen containers       |
| SearchBar                | Search functionality     | Menu filtering               |
| SectionList              | Categorized lists        | Menu categories              |
| TextInput                | User text entry          | Forms and authentication     |
| MaskedTextInput          | Formatted text entry     | Phone and personal data      |
| Material Community Icons | UI icons                 | Navigation and actions       |

