import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import login from "services/Auth.service";

export default function App() {
  const [email, setEmail] = React.useState("ringa.matias@gmail.com");
  const [password, setPassword] = React.useState("password");

  const [token, setToken] = React.useState("");

  const handleLoginEvent = async (_event) => {
    await login(email, password)
      .then((response) => setToken(response.accessToken))
      .catch((error) => console.log(JSON.stringify(error)));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Confirm" onPress={(e) => handleLoginEvent(e)}></Button>
      <StatusBar style="auto" />

      <Text>Token: {token}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
