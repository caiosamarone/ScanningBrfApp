import { StyleSheet, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QrCodeScanner = ({
  isBlockedToScan,
  handleBarCodeScanned,
  onCloseScanner,
}) => {
  return (
    <BarCodeScanner
      style={[StyleSheet.absoluteFillObject, styles.container]}
      onBarCodeScanned={isBlockedToScan ? undefined : handleBarCodeScanned}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
      {isBlockedToScan && <Button title="Carregando" />}
      <Button title="Fechar" onPress={onCloseScanner} />
    </BarCodeScanner>
  );
};
const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  insideContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    height: "70%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});

export default QrCodeScanner;
