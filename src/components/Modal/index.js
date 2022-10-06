import { Modal as RNModal, StyleSheet } from "react-native";

const Modal = ({ children, ...props }) => {
  return <RNModal {...props}>{children}</RNModal>;
};

const styles = StyleSheet.create({});
export default Modal;
