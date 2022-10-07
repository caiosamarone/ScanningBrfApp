import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import BigList from "react-native-big-list";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListItems = ({ data, resumedItems }) => {
  if (resumedItems) {
    data = data?.slice(0, 5);
  }
  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text numberOfLines={1} style={{ width: 230, marginRight: 12 }}>
        {item}
      </Text>
      <Ionicons
        name="create"
        size={32}
        color="#72063c"
        onPress={() => Alert.alert("Item", `${item}`)}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <BigList
        style={styles.container}
        data={data}
        renderItem={renderItem}
        itemHeight={42}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    marginVertical: 8,
  },
  itemContainer: {
    flexDirection: "row",
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItems;
