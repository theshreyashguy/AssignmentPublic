
# Gig Flow Organizer Pro Mobile

A mobile app for organizing and managing your gigs, tasks, and workflow. Built with React Native and Expo, using Firebase for authentication and data storage.

## Features

- User authentication (login/register)
- Task management: add, edit, delete, and mark tasks as complete
- Real-time updates with Firestore
- Responsive and modern UI
- Priority and due date indicators for tasks

# Demo 


https://github.com/user-attachments/assets/1f5a9698-c12d-4c73-b2b2-166f004d36cb

| demo image1 | demo image 2 |
|-------------------------------------|-------------------------------------|
| ![2](https://github.com/user-attachments/assets/5f0f3d00-86cc-42c0-b56c-e5eb198d6358) | ![2](https://github.com/user-attachments/assets/5f0f3d00-86cc-42c0-b56c-e5eb198d6358) | 

 

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
