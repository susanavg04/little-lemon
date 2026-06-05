🍋 **Little Lemon App**

Mobile restaurant application built with React Native and Expo as part of the Meta Front-End / Back-End Developer Professional Certificate on Coursera.


**Project Overview**

Little Lemon is a modern Mediterranean restaurant mobile application designed to simulate a complete digital restaurant experience.
Little Lemon is a mobile restaurant application developed with React Native and Expo as part of the Meta Front-End / Back-End Developer Professional Certificate.

The application simulates a complete digital restaurant experience where users can:

-Browse the restaurant menu
-Search and filter dishes
-Customize meal options
-Add products to the cart
-Manage user profiles
-Log in and log out
-Store local user data using AsyncStorage
-Store menu data using SQLite
-Navigate through multiple interactive screens

This project was developed for educational purposes to practice mobile development concepts using React Native.

**Project Goals**

The main objectives of this project are:

1.Apply React Native fundamentals in a real-world mobile application
2.Implement screen navigation using React Navigation
3.Manage local persistence with AsyncStorage
4.Use SQLite to store Menu Items and connect SQLite to a state
5.Use ContextAPI for login and Create form validation for users
6.Organize code using a scalable architecture
7.Build reusable UI components
8.Practice state management and user authentication flow
9.Create a clean and user-friendly restaurant experience
10.Creating a form for storing customer data.
11.Creation of search filters and banners

**Technologies Used**

1.React Native:	Mobile application framework
2.Expo:	Development environment
3.React Navigation:	Navigation between screens
4.AsyncStorage:	Local data persistence
5.React Query:	Data and state management
6.JavaScript (ES6+):	Programming language
7.Expo Vector Icons:	Icons library

## Project Structure

```text
little-lemon/
├── Assets/
│   ├── Fonts/
│   └── Images/
│
├── Model/
│   ├── Cartservices.js
│   ├── DataBase_AsyncStorage.js
│   └── DataBase_SQLite.js
│
├── View/
│   ├── components/
│   │   ├── Button.js
│   │   ├── Filter.js
│   │   ├── Header.js
│   │   ├── Optionselector.js
│   │   └── Quantityselector.js
│   │
│   └── screens/
│       ├── Home.js
│       ├── Cartscreen.js
│       ├── Dishdetailscreen.js
│       ├── ForgotPasswordScreen.js
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
├── eas.json
├── package-lock.json
├── package.json
└── README.md
```
**Architecture Overview**

The project follows a structure inspired by the MVVM pattern:
| Layer     | Responsibility                         |
| --------- | -------------------------------------- |
| Model     | Data management, storage, and services |
| View      | UI components and application screens  |
| ViewModel | Business logic and state handling      |

**ScreenShot**

<p align="center">
  <img src="./assets/images/Proceso de Perfil.png" width="250" alt="Proceso de Perfil" />
  <img src="./assets/images/Proceso de Log in.png" width="250" alt="Proceso de Log in" />
  <img src="./assets/images/Proceso de compra.png" width="250" alt="Proceso de Compra" />
</p>

**User Interface Design**

Design Overview

The Little Lemon Restaurant application follows a clean, modern, and user-friendly interface designed to provide a smooth food ordering experience. The visual design is based on the official Little Lemon branding, using a consistent color palette, intuitive navigation, and responsive layouts.


**Architecture Overview**

The project follows a structure inspired by the MVVM pattern:
| Layer     | Responsibility                         |
| --------- | -------------------------------------- |
| Model     | Data management, storage, and services |
| View      | UI components and application screens  |
| ViewModel | Business logic and state handling      |


**User Interface Design**

Design Overview

The Little Lemon Restaurant application follows a clean, modern, and user-friendly interface designed to provide a smooth food ordering experience. The visual design is based on the official Little Lemon branding, using a consistent color palette, intuitive navigation, and responsive layouts.
The application was developed using React Native and follows a mobile-first design approach.

Design Principles

The user interface was built according to the following principles:

-Simplicity and ease of use.
-Consistent visual identity across all screens.
-Fast access to menu categories and dishes.
-Clear navigation through bottom tab navigation.
-Readable typography and accessible color contrast.
-Minimalistic layouts focused on restaurant content.

Color Palette

The application uses the official Little Lemon brand colors.

| Color      | Hex Code | Purpose                                         |
| ---------- | -------- | ---------------------------------------------   |
| Dark Green | #495E57  | Headers, category buttons, backgrounds        |
| Yellow     | #F4CE14  | Primary actions, highlights, restaurant title |
| White      | #FFFFFF  | Main content backgrounds                      |
| Light Gray | #EDEFEE  | Secondary backgrounds                         |
| Black      | #000000  | Text and totals                               |

Typography

Custom fonts are included in the application through the assets/fonts directory.

Fonts Used

1. Markazi Text
Used for restaurant titles and large headings.

2. Karla
Used for body text, buttons, descriptions, and labels.

3. Space Mono
Used in specific interface elements when needed.

Navigation Design
The application uses Bottom Tab Navigation to provide quick access to the main sections.

Navigation Tabs
This navigation structure ensures that users can move between the main features with a single tap.

| Screen  | Description                                    |
| ------- | ---------------------------------------------- |
| Home    | Displays restaurant information and menu items |
| Cart    | Shows selected dishes and order summary        |
| Profile | Displays and updates user information          |
| Login   | Provides user authentication functionality     |



**Author**

Developed by Susana Valencia Gallego
As part of the Meta Professional Certificate Program on Coursera.

GitHub Repository:
https://github.com/susanavg04/little-lemon?utm_source=chatgpt.com
