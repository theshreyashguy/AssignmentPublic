import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  Button,
  Card,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, register, error, loading } = useAuth();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
    } catch (err) {
      // Error is handled by the useAuth hook
    }
  };

  return (
    <LinearGradient colors={["#6C63FF", "#483D8B"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Card style={styles.card}>
          <Card.Title
            title={isLogin ? "Welcome back!" : "Let's get started!"}
          />
          <Card.Content>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {!isLogin && (
              <TextInput
                label="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            )}
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={loading}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator animating={true} color="#fff" />
              ) : isLogin ? (
                "Log in"
              ) : (
                "Sign up"
              )}
            </Button>

            <Button onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? "Get started" : "Have an account? Log in"}
            </Button>
          </Card.Content>
        </Card>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    color: "#6C63FF",
    textAlign: "center",
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: "#F8D7DA",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "#721C24",
    textAlign: "center",
  },
});
