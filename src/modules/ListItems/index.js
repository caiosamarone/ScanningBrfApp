import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import BigList from "react-native-big-list";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListItems = ({ data, resumedItems }) => {
  if (resumedItems) {
    data = data?.slice(0, 5);
  }
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text numberOfLines={1} style={{ width: 230, marginRight: 12 }}>
        {item.qrCode}
      </Text>
      <Ionicons
        name="create"
        size={32}
        color="#72063c"
        onPress={() => Alert.alert("Item", `${item.qrCode}`)}
      />
    </View>
  );
  return (
    <View style={styles.container(resumedItems)}>
      <BigList data={data} renderItem={renderItem} itemHeight={42} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: (resumedItems) => ({
    flex: resumedItems ? 0.9 : 0.93,
    marginVertical: 8,
  }),
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});

export default ListItems;
