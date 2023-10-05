import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FeatherIcon from "react-native-vector-icons/Feather";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { EXPO_PUBLIC_API_URL } from "@env";
import { Skeleton } from "native-base";

export default function Profile() {
  const route = useRoute();
  const { userId } = route.params;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${EXPO_PUBLIC_API_URL}/users/${userId}`
        );
        setData(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchUserData();
    });

    return unsubscribe;
  }, [navigation, userId]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("login");
    } catch (error) {
      console.error("Kesalahan saat logout:", error);
    }
  };

  const goToMyRecipes = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("myRecipes", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  const goToLiked = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("liked", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  const goToSaved = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("saved", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  const goToEditProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("edit", { userId });
    } catch (error) {
      console.error("Error retrieving user ID:", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.wrap}>
            {data && (
              <View style={{ marginTop: 80 }}>
                {data?.photo ? (
                  <Image
                    style={{ width: 94, height: 94, borderRadius: 47 }}
                    source={{ uri: data?.photo }}
                  />
                ) : (
                  <FeatherIcon
                    name="user"
                    style={{
                      fontSize: 80,
                      backgroundColor: "white",
                      width: 94,
                      height: 94,
                      borderRadius: 47,
                      textAlign: "center",
                      lineHeight: 94,
                    }}
                  />
                )}
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    marginTop: 20,
                    textAlign: "center",
                  }}
                >
                  {data.name}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.menu}>
            <View style={styles.row}>
              <FeatherIcon
                name="user"
                style={styles.icon}
                onPress={goToEditProfile}
              />
              <Text onPress={goToEditProfile}>Edit Profile</Text>
              <FeatherIcon
                name="arrow-right"
                style={[styles.icon, styles.arrowIcon]}
                onPress={goToEditProfile}
              />
            </View>
            <View style={styles.row}>
              <FeatherIcon
                name="award"
                style={styles.icon}
                onPress={goToMyRecipes}
              />
              <Text onPress={goToMyRecipes}>My Recipe</Text>
              <FeatherIcon
                name="arrow-right"
                style={[styles.icon, styles.arrowIcon]}
                onPress={goToMyRecipes}
              />
            </View>
            <View style={styles.row}>
              <FeatherIcon
                name="bookmark"
                style={styles.icon}
                onPress={goToSaved}
              />
              <Text onPress={goToSaved}>Saved Recipe</Text>
              <FeatherIcon
                name="arrow-right"
                style={[styles.icon, styles.arrowIcon]}
                onPress={goToSaved}
              />
            </View>
            <View style={styles.row}>
              <FeatherIcon
                name="thumbs-up"
                style={styles.icon}
                onPress={goToLiked}
              />
              <Text onPress={goToLiked}>Liked Recipe</Text>
              <FeatherIcon
                name="arrow-right"
                style={[styles.icon, styles.arrowIcon]}
                onPress={goToLiked}
              />
            </View>
            <TouchableOpacity style={styles.row} onPress={handleLogout}>
              <FeatherIcon name="log-out" style={styles.logout} />
              <Text style={{ color: "red" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  wrap: {
    height: 308,
    backgroundColor: "#EEC302",
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
  },
  menu: {
    backgroundColor: "white",
    width: 360,
    height: 500,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -50,
    marginHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: 360,
    height: 64,
    padding: 20,
    paddingRight: 0,
  },
  icon: {
    color: "#EEC302",
    fontSize: 24,
    marginRight: 15,
  },
  arrowIcon: {
    color: "#8C8C8C",
    marginLeft: "auto",
  },
  logout: {
    color: "red",
    fontSize: 24,
    marginRight: 15,
  },
});
