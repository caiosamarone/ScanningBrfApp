import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

const LoaderOverlay = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={24} color={"black"} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoaderOverlay;
