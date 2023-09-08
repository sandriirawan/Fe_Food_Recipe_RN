import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getLikeds, { deleteLikeds } from "../../../config/Redux/Action/LikedsAction";

export default function LikedRecipes() {
  const dispatch = useDispatch();
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    dispatch(getLikeds(userId));
  }, [dispatch, userId]);

  const getLiked = useSelector((state) => state.liked);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getLiked.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [getLiked.loading]);

  const handleDelete = async (liked_id) => {
    try {
      dispatch(deleteLikeds(liked_id));
      dispatch(getLikeds(userId));
    } catch (error) {
      console.error("Error deleting liked:", error);
    }
  };

  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const goToDetail = (recipeId) => {
    navigation.navigate("detail", { recipeId });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 48 }}>
        <FeatherIcon
          style={{
            color: "#999999",
            fontSize: 34,
            marginRight: 110,
          }}
          name="arrow-left"
          onPress={goBack}
        />
        <Text
          style={{
            color: "#EEC302",
            fontSize: 18,
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          Liked Recipe
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6D61F2" style={{ marginTop: 20 }} />
      ) : (
        getLiked.liked.map((liked) => (
          <View style={styles.recipeWrapper} key={liked.id}>
            <TouchableOpacity
              style={styles.recipeTouchable}
              onPress={() => goToDetail(liked.id)}
            >
              <Image
                style={{ width: 80, height: 80, borderRadius: 16 }}
                source={{ uri: liked.photo }}
              />
              <View style={{ marginTop: 5, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {liked.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleDelete(liked.liked_id)}>
                <FeatherIcon
                  style={styles.bookmarkIcon}
                  name="thumbs-up"
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 25,
  },
  recipeWrapper: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  recipeTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  bookmarkIcon: {
    fontSize: 24,
    marginLeft: 10,
    color: "white",
    backgroundColor: "#EEC302",
    width: 36,
    height: 36,
    borderRadius: 50,
    textAlign: "center",
    padding: 5,
  },
});
