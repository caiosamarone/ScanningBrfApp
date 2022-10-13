const checkItemAlreadyScanned = (item, data) => {
  const alreadyScanned = data.findIndex((i) => i.qrCode === item.toString());
  return alreadyScanned === -1 ? false : true;
};

export default checkItemAlreadyScanned;
