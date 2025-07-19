import React from "react";
import { AuthScreen } from "./AuthScreen";
import { TaskDashboard } from "../components/TaskDashboard";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";

export const TaskApp = () => {
  const { user, login, register, logout, error: authError } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, toggleTaskComplete } =
    useTasks(user?.uid);

  if (!user) {
    return (
      <AuthScreen onLogin={login} onRegister={register} error={authError} />
    );
  }

  return (
    <TaskDashboard
      user={user}
      tasks={tasks}
      onAddTask={addTask}
      onUpdateTask={updateTask}
      onDeleteTask={deleteTask}
      onToggleComplete={toggleTaskComplete}
      onLogout={logout}
    />
  );
};
