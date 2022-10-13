import { StyleSheet, Button, TextInput, Alert } from "react-native";
import { useState } from "react";
import { Modal } from "components/Modal";

const ManualInputModal = ({ visible, onCloseModal, onReadQrCode }) => {
  const [manualInputText, setManualInputText] = useState("");

  const handlePressManualButton = () => {
    //mudar Tamanho para 100 depois
    if (manualInputText.length < 9 || manualInputText.toString().length < 3) {
      Alert.alert("Muito pequeno...");
      return;
    }

    //inserir toast que some automatico de feedback
    onReadQrCode(manualInputText);
    setManualInputText("");
    onCloseModal();
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setManualInputText("");
        onCloseModal();
      }}
    >
      <TextInput
        placeholder="Digite aqui..!!."
        autoFocus
        autoCorrect={false}
        value={manualInputText}
        keyboardType="number-pad"
        onChangeText={(text) => setManualInputText(text)}
      />
      <Button title="Enviar" onPress={handlePressManualButton} />
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ManualInputModal;
