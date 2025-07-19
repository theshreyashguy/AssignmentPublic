
# Gig Flow Organizer Pro Mobile

A mobile app for organizing and managing your gigs, tasks, and workflow. Built with React Native and Expo, using Firebase for authentication and data storage.

## Features

- User authentication (login/register)
- Task management: add, edit, delete, and mark tasks as complete
- Real-time updates with Firestore
- Responsive and modern UI
- Priority and due date indicators for tasks

## Technologies Used

- React Native
- Expo
- Firebase (Firestore & Auth)
- react-native-paper (UI components)
- expo-linear-gradient (background gradients)

## Project Structure

```text
app.json
App.tsx
babel.config.js
index.js
metro.config.js
package.json
src/
  components/
    TaskCard.tsx
    TaskDashboard.tsx
    TaskForm.tsx
  config/
    firebase.ts
  hooks/
    useAuth.ts
    useTasks.ts
  navigation/
    AppNavigator.tsx
  screens/
    AuthScreen.tsx
    TaskApp.tsx
  types/
    index.ts
    Task.ts
    User.ts
assets/
  adaptive-icon.png
  favicon.png
  icon.png
  splash-icon.png
```

## Getting Started

1. Clone the repository
2. Run `npm install` or `yarn install`
3. Set up your Firebase project and update `src/config/firebase.ts` with your credentials
4. Start the development server:

   ```sh
   expo start
   ```

## Usage

- Register or log in to your account
- Add, edit, or delete tasks
- Mark tasks as complete
- View tasks with priority and due date indicators

## License

MIT
