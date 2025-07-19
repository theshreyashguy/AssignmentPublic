import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import {
  Appbar,
  Card,
  Chip,
  FAB,
  Text,
  TextInput,
  SegmentedButtons,
} from "react-native-paper";
import { Task, User as UserType } from "../types";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";

interface TaskDashboardProps {
  user: UserType;
  tasks: Task[];
  onAddTask: (
    task: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">
  ) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onLogout: () => void;
}

export const TaskDashboard: React.FC<TaskDashboardProps> = ({
  user,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  onLogout,
}) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const titleMatch = task.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const descriptionMatch = task.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const priorityMatch =
          !priorityFilter || task.priority === priorityFilter;
        const statusMatch =
          !statusFilter ||
          (statusFilter === "completed" ? task.completed : !task.completed);
        return (titleMatch || descriptionMatch) && priorityMatch && statusMatch;
      })
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  }, [tasks, searchTerm, priorityFilter, statusFilter]);

  const getTasksByTimeGroup = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() + 7);

    const todayTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === today.toDateString();
    });

    const tomorrowTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === tomorrow.toDateString();
    });

    const thisWeekTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate > tomorrow && taskDate <= thisWeek;
    });

    const laterTasks = filteredTasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return taskDate > thisWeek;
    });

    return { todayTasks, tomorrowTasks, thisWeekTasks, laterTasks };
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSaveTask = (
    taskData: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const { todayTasks, tomorrowTasks, thisWeekTasks, laterTasks } =
    getTasksByTimeGroup();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title={`Welcome, ${user.displayName}`} />
        <Appbar.Action icon="logout" onPress={onLogout} />
      </Appbar.Header>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Search tasks..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            left={<TextInput.Icon name="magnify" />}
          />
          <View style={styles.filterContainer}>
            <SegmentedButtons
              value={statusFilter || ""}
              onValueChange={setStatusFilter}
              buttons={[
                { value: "", label: "All" },
                { value: "incomplete", label: "Remaining" },
                { value: "completed", label: "Done" },
              ]}
            />
          </View>
        </Card.Content>
      </Card>

      <ScrollView style={styles.scrollView}>
        {todayTasks.length > 0 && (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>Today</Text>
            <FlatList
              data={todayTasks}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onToggleComplete={onToggleComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {tomorrowTasks.length > 0 && (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>Tomorrow</Text>
            <FlatList
              data={tomorrowTasks}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onToggleComplete={onToggleComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {thisWeekTasks.length > 0 && (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>This Week</Text>
            <FlatList
              data={thisWeekTasks}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onToggleComplete={onToggleComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {laterTasks.length > 0 && (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>Later</Text>
            <FlatList
              data={laterTasks}
              renderItem={({ item }) => (
                <TaskCard
                  task={item}
                  onEdit={handleEditTask}
                  onDelete={onDeleteTask}
                  onToggleComplete={onToggleComplete}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
        {filteredTasks.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No tasks found. Try adjusting your filters.
            </Text>
          </View>
        )}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowTaskForm(true)}
      />

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSaveTask}
          onCancel={handleCancelForm}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  card: {
    margin: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    padding: 1,
  },
  scrollView: {
    flex: 1,
  },
  groupContainer: {
    margin: 10,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
