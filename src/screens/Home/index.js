import {
  StyleSheet,
  SafeAreaView,
  Alert,
  DeviceEventEmitter,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SincronizeSAP, ListItems, Loader } from "modules";
import Package from "utils/services/Package";
import { ToastConfig } from "utils/services/ToastConfig";
import { checkItemAlreadyScanned } from "utils/helpers";
import Header from "./Header";
import ButtonShowMore from "./ButtonShowMore";

const Home = ({ navigation }) => {
  const [scanData, setScanData] = useState([]);
  const [lockedInput, setLockedInput] = useState(false);
  const [loadingDatabase, setLoadingDatabase] = useState(false);
  const [textScanned, setTextScanned] = useState("");
  const [isSincronizeVisible, setSincronizeVisible] = useState(false);

  const ref_input = useRef();

  const handleFocus = () => {
    setLockedInput(true);
    setTimeout(() => {
      setLockedInput(false);
      ref_input.current.focus();
    }, 2000);
  };

  const deleteAllItens = async () => {
    Package.deleteAll().then((rows) => console.log("rowsAffected", rows));
    setScanData([]);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener("onHandleFocus", () => {
      handleFocus();
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const getPackagesFromDatabase = async () => {
      setLoadingDatabase(true);
      try {
        const allPackages = await Package.findAll();
        setScanData([...allPackages] ?? []);
      } catch (er) {
        showToast("error", "Erro ao recuperar dados.");
        console.log(er);
      } finally {
        setLoadingDatabase(false);
      }
    };
    getPackagesFromDatabase();
  }, []);

  const showToast = (type, text1) => {
    const toastObject = {
      type,
      text1,
    };
    Toast.show(toastObject);
  };

  const onReadQrCode = async (text) => {
    const textFormated = text?.replace(/\D+/g, "");
    const alreadyScanned = checkItemAlreadyScanned(textFormated, scanData);

    if (alreadyScanned) {
      Alert.alert("Erro", "Este item já foi registrado.", [
        { text: "Fechar", style: "cancel" },
      ]);
      setTextScanned("");
      handleFocus();
      return;
    }
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
      `Deseja sincronizar com o SAP ${scanData?.length} itens?`,
      `É preciso estar conectado à internet, recomenda-se uma rede Wifi.Caso a sincronização ocorra com sucesso, os itens registrados serão removidos do seu celular.`,
      [
        {
          text: "FECHAR",
          style: "cancel",
        },
        { text: "SINCRONIZAR", onPress: () => setSincronizeVisible(true) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingDatabase ? (
        <Loader />
      ) : (
        <>
          <Header
            textScanned={textScanned}
            ref_input={ref_input}
            lockedInput={lockedInput}
            onReadQrCode={onReadQrCode}
            scanData={scanData}
            handleDialogSincronize={handleDialogSincronize}
          />

          <ListItems data={scanData} resumedItems />

          {scanData?.length > 5 && (
            <ButtonShowMore navigation={navigation} scanData={scanData} />
          )}

          <SincronizeSAP
            isVisible={isSincronizeVisible}
            onClose={() => setSincronizeVisible(false)}
            onDeleteItens={deleteAllItens}
          />
        </>
      )}

      <Toast config={ToastConfig} visibilityTime={1800} topOffset={30} />
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
});

export default Home;
