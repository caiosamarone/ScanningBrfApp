import { StyleSheet, Text, SafeAreaView, View, Button } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState([]);
  const [lockedScan, setLockedScan] = useState(false);
  const [isQrCodeVisible, setQrCodeVisible] = useState(true);

  useEffect(() => {
    const requirePermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    requirePermission();
  }, []);

  useEffect(() => {
    if (!!scanData.length) {
      setLockedScan(true);
      setTimeout(() => {
        setLockedScan(false);
      }, 3000);
    }
  }, [scanData]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Por favor, conceda permissão de acesso à câmera.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log(type, data);
    if (data) {
      setScanData((oldData) => [
        ...(oldData || []),
        {
          data,
          type,
        },
      ]);
    }
  };
  console.log(scanData.length);
  return (
    <SafeAreaView style={styles.container}>
      {console.log("scandata", scanData)}

      {isQrCodeVisible ? (
        <View style={styles.insideContainer}>
          <View style={styles.wrapper}>
            <BarCodeScanner
              style={StyleSheet.absoluteFillObject}
              onBarCodeScanned={lockedScan ? undefined : handleBarCodeScanned}
            />
            {lockedScan && (
              <Button
                title="Carregando"
                onPress={() => setScanData(undefined)}
              />
            )}
          </View>
          <Button title="Fechar" onPress={() => setQrCodeVisible(false)} />
        </View>
      ) : (
        <View style={styles.container}>
          <Button
            title="Escanear novamente"
            onPress={() => setQrCodeVisible(true)}
          />
          {scanData.map((i, index) => (
            <Text key={index}>{i.data}</Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

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
});
