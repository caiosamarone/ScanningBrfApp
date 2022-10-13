import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { PrimaryButton } from "components";

const Header = ({
  textScanned,
  ref_input,
  lockedInput,
  onReadQrCode,
  scanData,
  handleDialogSincronize,
}) => {
  return (
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
            <PrimaryButton onPress={handleDialogSincronize}>
              SINCRONIZAR
            </PrimaryButton>
          </View>
        </View>
      )}

      <Text style={styles.counterText}>
        Itens registrados: {scanData.length}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  qrCodeInputText: {
    borderWidth: 1,
    padding: 6,
    borderColor: "#72063c",
    marginBottom: 18,
  },
  infoWrapper: {
    flexDirection: "row",
  },
  buttonSincronizeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  counterText: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "bold",
  },
});
