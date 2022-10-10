import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";

const DialogPopper = ({
  title,
  isVisible,
  description,
  actionType,
  onPressActionButton,
  handleCancel,
}) => {
  const handleAction = () => {
    switch (actionType) {
      case "confirm":
        return (
          <View style={styles.buttonContainer}>
            <Dialog.Button label="Cancelar" onPress={handleCancel} />
            <Dialog.Button label="Confirmar" onPress={onPressActionButton} />
          </View>
        );
      case "info":
        return <Dialog.Button label="Fechar" onPress={handleCancel} />;
    }
  };

  return (
    <Dialog.Container visible={isVisible} onBackdropPress={handleCancel}>
      <Dialog.Title style={{ fontWeight: "bold" }}>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      {handleAction()}
    </Dialog.Container>
  );
};

export default DialogPopper;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
  },
});
