import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../components/Modal";
import checkUserConnection from "../../utils/api/checkUserConnection";
import PrimaryButton from "../../components/PrimaryButton";

const SincronizeSAP = ({ isVisible, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [startedSincronize, setStartedSincronize] = useState(false);
  const [error, setError] = useState({
    message: "",
    type: "",
  });

  const handleSincronizeSAP = useCallback(async () => {
    setLoading(true);
    setStartedSincronize(false);
    setError({});
    const { isConnected } = await checkUserConnection();
    if (!isConnected) {
      Alert.alert("É preciso estar conectado à internet. Tente novamente.");
      setError({
        type: "network",
        message: "É preciso estar conectado à internet. Tente novamente.",
      });
      return;
    }

    try {
      setTimeout(() => {
        setStartedSincronize(true);
        // setError({
        //   type: "network",
        //   message: "Ocorreu um erro na sincronização. Tente novamente",
        // });
      }, 3000);
    } catch (er) {
      console.log(er);
    } finally {
      setLoading(false);
      setStartedSincronize(false);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      handleSincronizeSAP();
    }
  }, [handleSincronizeSAP, isVisible]);

  const closeModal = () => {
    setError({});
    setLoading(false);
    setStartedSincronize(false);
    onClose();
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {error.type && <Text style={styles.modalText}>{error.message}</Text>}
          {!error.type && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.modalText}>
                {startedSincronize
                  ? "Sincronizando..."
                  : "Iniciando Sincronização..."}
              </Text>

              <ActivityIndicator size={24} color={"black"} />
            </View>
          )}

          <View style={styles.buttonContainer}>
            {error.type && (
              <PrimaryButton onPress={handleSincronizeSAP}>
                Tentar novamente
              </PrimaryButton>
            )}
            {/* TODO Abortar Fetch: */}
            <PrimaryButton onPress={closeModal}>FECHAR</PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 32,
    minWidth: 280,
    paddingHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 14,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 8,
  },
});

export default SincronizeSAP;
