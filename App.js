import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Button,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { useState, useRef } from "react";
import ManualInputModal from "./src/modules/ManualInputModal";
import PrimaryButton from "./src/components/PrimaryButton";

export default function App() {
  const [scanData, setScanData] = useState([]);
  const [lockedInput, setLockedInput] = useState(false);
  const [textScanned, setTextScanned] = useState("");
  const [isModalManualInputVisible, setModalManualInputVisible] =
    useState(false);
  const ref_input = useRef();

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

  const onReadQrCode = (text) => {
    //perguntar quais são os numeros fixos que o Sap vai necessitar para pegar apenas os necessarios
    // const slicedText = text.slice(0, 5);
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

    setScanData((oldData) => [...oldData, textFormated]);
    setTextScanned("");
    handleFocus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ManualInputModal
        visible={isModalManualInputVisible}
        onClearInputText={() => setManualInputText("")}
        onCloseModal={() => setModalManualInputVisible(false)}
        onReadQrCode={onReadQrCode}
      />
      {/* <Modal
        animationType={"slide"}
        transparent={false}
        visible={isModalManualInputVisible}
        onRequestClose={() => {
          setManualInputText("");
          setModalManualInputVisible(false);
        }}
      >
        <TextInput
          placeholder="Digite aqui..."
          autoFocus
          autoCorrect={false}
          value={manualInputText}
          keyboardType="number-pad"
          onChangeText={(text) => setManualInputText(text)}
        />
        <Button title="Enviar" onPress={handlePressManualButton} />
      </Modal> */}
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
        />
        <View style={styles.infoWrapper}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => setModalManualInputVisible(true)}>
              DIGITAR
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={() => Alert.alert("sicronizando...")}>
              SINCRONIZAR
            </PrimaryButton>
          </View>
        </View>

        <Text>Contador de Items registrados: {scanData.length}</Text>
        {scanData.map((i, index) => (
          <Text key={index}>{i}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 22,
  },

  infoWrapper: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 3,
  },
});
