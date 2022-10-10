import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import ListItems from "../../modules/ListItems";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import SincronizeSAP from "../SincronizeSAP";
import Package from "../../utils/services/Package";
import LoaderOverlay from "../../modules/LoaderOverlay";

const Home = () => {
  const [scanData, setScanData] = useState([]);
  const [lockedInput, setLockedInput] = useState(false);
  const [loadingDatabase, setLoadingDatabase] = useState(false);
  const [textScanned, setTextScanned] = useState("");
  const [isSincronizeVisible, setSincronizeVisible] = useState(false);
  const [sincronizeDialogVisible, setSincronizeDialogVisible] = useState(false);
  const ref_input = useRef();

  // Package.deleteAll().then((rows) => console.log("rowsAffected", rows));
  // Package.findAll().then((packages) => {
  //   console.log("packages", packages);
  // });

  useEffect(() => {
    const getPackagesFromDatabase = async () => {
      setLoadingDatabase(true);
      try {
        const allPackages = await Package.findAll();
        console.log("----------------", allPackages.length);
        setScanData([...allPackages] ?? []);
      } catch (er) {
        showToast("error", "Erro!");
        console.log(er);
      } finally {
        setLoadingDatabase(false);
      }
    };
    getPackagesFromDatabase();
  }, []);

  const toastConfig = {
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

  const handleFocus = () => {
    setLockedInput(true);
    setTimeout(() => {
      setLockedInput(false);
      ref_input.current.focus();
    }, 2000);
  };

  const showToast = (type, text1) => {
    const toastObject = {
      type,
      text1,
    };

    Toast.show(toastObject);
  };

  const onReadQrCode = async (text) => {
    const textFormated = text?.replace(/\D+/g, "");

    // if (scanData.includes(textFormated)) {
    //   Alert.alert("Erro", "Este item já foi bipado.", [
    //     { text: "Sorry!", style: "cancel" },
    //   ]);
    //   setTextScanned("");
    //   handleFocus();
    //   return;
    // }
    try {
      const packageIdInserted = await Package.insert({
        qrCode: textFormated.toString(),
      });
      if (!!packageIdInserted) {
        const newItem = {
          id: packageIdInserted,
          qrCode: textFormated.toString(),
        };
        setScanData((oldData) => [newItem, ...oldData]);
        showToast("success", "QRCode lido com sucesso!");
      } else {
        throw new Error("Erro inserindo");
      }
    } catch (e) {
      showToast("error", "Erro ao adicionar. Tente novamente.");
    } finally {
      setTextScanned("");
      handleFocus();
    }
  };

  const handleDialogSincronize = () => {
    Alert.alert(
      "Atenção",
      `Deseja sincronizar com o SAP ${scanData?.length} itens? É preciso estar conectado à internet, recomenda-se uma rede Wifi.`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => setSincronizeVisible(true) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingDatabase ? (
        <LoaderOverlay />
      ) : (
        <>
          <View>
            <TextInput
              value={textScanned}
              ref={ref_input}
              autoCorrect={false}
              autoFocus
              editable={!lockedInput}
              onChangeText={onReadQrCode}
              showSoftInputOnFocus={false}
              placeholder="Aguardando leitura..."
              style={styles.qrCodeInputText}
            />
            {!!scanData?.length && (
              <View style={styles.infoWrapper}>
                <View style={styles.buttonSincronizeContainer}>
                  <PrimaryButton onPress={() => handleDialogSincronize()}>
                    SINCRONIZAR
                  </PrimaryButton>
                </View>
              </View>
            )}

            <Text style={styles.counterText}>
              Contagem de Caixas lidas: {scanData.length}
            </Text>
          </View>
          <ListItems data={scanData} resumedItems />
          {scanData?.length > 5 && (
            <View style={styles.buttonShowMoreContainer}>
              <PrimaryButton onPress={() => Alert.alert("sicronizando...")}>
                VER MAIS
              </PrimaryButton>
            </View>
          )}
          <SincronizeSAP
            isVisible={isSincronizeVisible}
            onClose={() => setSincronizeVisible(false)}
          />
        </>
      )}

      <Toast config={toastConfig} visibilityTime={1800} topOffset={30} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    paddingTop: 50,
    paddingHorizontal: 22,
  },

  infoWrapper: {
    flexDirection: "row",
  },
  buttonSincronizeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonShowMoreContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  qrCodeInputText: {
    borderWidth: 1,
    padding: 6,
    borderColor: "#72063c",
    marginBottom: 18,
  },
  counterText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
