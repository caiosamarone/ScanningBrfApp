import React from "react";
import { DeviceEventEmitter, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import { ListItems } from "../../modules";

const AllPackages = ({ route, navigation }) => {
  const { scanData } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{scanData.length} itens registados</Text>
      <ListItems data={scanData} />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          onPress={() => {
            DeviceEventEmitter.emit("onHandleFocus");
            navigation.navigate("Home");
          }}
        >
          Voltar
        </PrimaryButton>
      </View>
    </View>
  );
};

export default AllPackages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 22,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
