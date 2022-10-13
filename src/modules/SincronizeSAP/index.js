import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import checkUserConnection from "utils/api/checkUserConnection";
import { Modal, PrimaryButton } from "components";

const SincronizeSAP = ({ isVisible, onClose, onDeleteItens }) => {
  const [startedSincronize, setStartedSincronize] = useState(false);
  const [error, setError] = useState({
    message: "",
    type: "",
  });
  let controller = new AbortController();
  const closeModal = () => {
    setError({});
    setStartedSincronize(false);
    onClose();
  };
  const handleSuccessSincronize = (itensSincronized) => {
    //TODO ** pegar a quantidade de itens sincronizados no get
    onDeleteItens();
    Alert.alert(
      `${itensSincronized} itens sincronizados com sucesso.`,
      "Os itens sincronizados foram removidos localmente.",
      [
        {
          text: "OK",
          onPress: () => closeModal(),
          style: "confirm",
        },
      ]
    );
  };

  const handleSincronizeSAP = useCallback(async () => {
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
      setTimeout(async () => {
        try {
          setStartedSincronize(true);
          let res = await fetch(
            "https://api.github.com/users/caiosamarone/repos?sort=updated",
            {
              method: "GET",
              signal: controller.signal,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          res = await res.json();
          const allReposName = res.map((i) => i.name);
          if (!!Object.keys(allReposName).length) {
            handleSuccessSincronize(100);
          }
        } catch (er) {
          console.log(er);
        }
      }, 10000);
    } catch (er) {
      console.log(er);
    } finally {
      setStartedSincronize(false);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      handleSincronizeSAP();
    }
  }, [handleSincronizeSAP, isVisible]);

  const handleDialogCancelSincronize = () => {
    Alert.alert(
      "Atenção",
      "Deseja parar a sincronização? Os dados não serão sincronizados com o SAP.",
      [
        {
          text: "CONTINUAR",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "PARAR",
          onPress: () => {
            controller.abort();
            closeModal();
          },
        },
      ]
    );
  };

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={isVisible}
      onRequestClose={handleDialogCancelSincronize}
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

            <PrimaryButton onPress={handleDialogCancelSincronize}>
              FECHAR
            </PrimaryButton>
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
