import { StyleSheet, View } from "react-native";
import React from "react";
import { PrimaryButton } from "components";

const ButtonShowMore = ({ navigation, scanData }) => {
  return (
    <View style={styles.buttonShowMoreContainer}>
      <PrimaryButton
        onPress={() =>
          navigation.navigate("AllPackages", {
            scanData,
          })
        }
      >
        VER MAIS
      </PrimaryButton>
    </View>
  );
};

export default ButtonShowMore;

const styles = StyleSheet.create({
  buttonShowMoreContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
