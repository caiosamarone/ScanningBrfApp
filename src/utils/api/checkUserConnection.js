import NetInfo from "@react-native-community/netinfo";

const checkUserConnection = async () => {
  const res = await NetInfo.fetch();
  return {
    isConnected: res.isConnected,
    typeOfConnection: res.type,
  };
};

export default checkUserConnection;
