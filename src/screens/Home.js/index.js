import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import ListItems from "../../modules/ListItems";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import SincronizeSAP from "../SincronizeSAP";

const Home = () => {
  const [scanData, setScanData] = useState([]);
  const [lockedInput, setLockedInput] = useState(false);
  const [textScanned, setTextScanned] = useState("");
  const [isSincronizeVisible, setSincronizeVisible] = useState(false);
  const ref_input = useRef();

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
      //colocar um Loader 'Carregando....'
      setLockedInput(false);
      ref_input.current.focus();
    }, 2000);
  };

  const checkLengthOfNumbers = (textFormated) => {
    return textFormated.toString().length;
  };

  const showToast = (type, text1) => {
    const toastObject = {
      type,
      text1,
    };

    Toast.show(toastObject);
  };

  const onReadQrCode = (text) => {
    const textFormated = text?.replace(/\D+/g, "");
    const length = checkLengthOfNumbers(textFormated);

    if (length < 10) {
      Alert.alert("Para digitar manualmente, pressione o botão abaixo.");
      return;
    }
    // if (scanData.includes(textFormated)) {
    //   Alert.alert("Erro", "Este item já foi bipado.", [
    //     { text: "Sorry!", style: "cancel" },
    //   ]);
    //   setTextScanned("");
    //   handleFocus();
    //   return;
    // }
    try {
      setScanData((oldData) => [textFormated, ...oldData]);
      showToast("success", "QRCode lido com sucesso!");
    } catch (e) {
      showToast("error", "Erro. Tente novamente.");
      console.log(e);
    } finally {
      setTextScanned("");
      handleFocus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.infoWrapper}>
          <View style={styles.buttonSincronizeContainer}>
            <PrimaryButton onPress={() => setSincronizeVisible(true)}>
              SINCRONIZAR
            </PrimaryButton>
          </View>
        </View>

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
