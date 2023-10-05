import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getBookmarks, {
  deleteBookmarks,
} from "../../../config/Redux/Action/bookmarksAction";
import { Skeleton } from "native-base";

export default function SavedRecipes() {
  const dispatch = useDispatch();
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    dispatch(getBookmarks(userId));
  }, [dispatch, userId]);

  const getBookmark = useSelector((state) => state.bookmark);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getBookmark.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [getBookmark.loading]);

  const handleDelete = (bookmark_id) => {
    try {
      dispatch(deleteBookmarks(bookmark_id));
      dispatch(getBookmarks(userId));
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
      <View
        style={{
          flexDirection: "row",
          height: 48,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FeatherIcon
          style={{
            color: "#999999",
            fontSize: 34,
            position: "absolute",
            left: 16,
          }}
          name="arrow-left"
          onPress={goBack}
        />
        <Text
          style={{
            color: "#EEC302",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Saved Recipe
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.recipeWrapper}>
          <Skeleton style={{ width: 80, height: 80, borderRadius: 16 }} />
          <View style={{ marginTop: 5, marginLeft: 10 }}>
            <Skeleton.Text h={16} w={120} />
          </View>
        </View>
      ) : (
        getBookmark.bookmark.map((item) => (
          <View style={styles.recipeWrapper} key={item.id}>
            <TouchableOpacity
              style={styles.recipeTouchable}
              onPress={() => goToDetail(item.id)}
            >
              <Image
                style={{ width: 80, height: 80, borderRadius: 16 }}
                source={{ uri: item.photo }}
              />
              <View style={{ marginTop: 5, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleDelete(item.bookmark_id)}>
                <FeatherIcon style={styles.bookmarkIcon} name="bookmark" />
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
    paddingTop: 10,
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
