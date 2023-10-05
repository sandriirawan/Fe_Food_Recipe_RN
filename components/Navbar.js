import { TouchableOpacity } from "react-native";
import React from "react";
import { View, StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navbar = () => {
  const navigation = useNavigation();
  const goToHome = () => {
    navigation.navigate("home");
  };
  const goToAddRecipe = () => {
    navigation.navigate("upload");
  };
  const goToSearch = () => {
    navigation.navigate("search");
  };
  const goToProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("profile", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.home} onPress={goToHome}>
          <FeatherIcon name="home" color="white" size={24} onPress={goToHome} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FeatherIcon
            name="search"
            color="#6E80B0"
            size={24}
            onPress={goToSearch}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FeatherIcon
            name="plus-square"
            color="#6E80B0"
            size={24}
            onPress={goToAddRecipe}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FeatherIcon
            name="user"
            color="#6E80B0"
            size={24}
            onPress={goToProfile}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  wrap: {
    flexDirection: "row",
  },
  home: {
    backgroundColor: "#EEC302",
    width: 97,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 25,
  },
});

export default Navbar;
