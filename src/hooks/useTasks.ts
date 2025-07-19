import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Task } from "../types";

export const useTasks = (userId?: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log("useTasks effect triggered for userId:", userId);
    if (!userId) {
      setTasks([]);
      return;
    }

    const tasksCollection = collection(db, "tasks");
    const q = query(tasksCollection, where("userId", "==", userId));
    console.log("Query created for userId:", userId);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Task)
      );
      setTasks(userTasks);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (
    taskData: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    if (!userId) return;
    await addDoc(collection(db, "tasks"), {
      ...taskData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const toggleTaskComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, {
        completed: !task.completed,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
  };
};
