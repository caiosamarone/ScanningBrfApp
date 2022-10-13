import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ backgroundColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 22,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ backgroundColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 22,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
};

const styles = StyleSheet.create({});
