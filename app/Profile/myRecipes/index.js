import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipes,
  getRecipesByUsersid,
} from "../../../config/Redux/Action/recipeAction";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Skeleton } from "native-base";

const MyRecipes = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const route = useRoute();
  const { userId } = route.params;
  const [showAlert, setShowAlert] = useState(false);

  const hideAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getRecipesByUsersid(userId));
    }
  }, [dispatch, userId, isFocused]);
  const getRecipe = useSelector((state) => state.recipe.recipe);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (getRecipe.loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [getRecipe.loading]);

  const handleDelete = async (recipeId) => {
    try {
      dispatch(deleteRecipes(recipeId));
      dispatch(getRecipesByUsersid(userId));
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("profile", { userId });
  };

  const goToDetail = (recipeId) => {
    navigation.navigate("detail", { recipeId });
  };

  const goToEditRecipes = (recipeId) => {
    navigation.navigate("editRecipes", { recipeId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
            My Recipe
          </Text>
        </View>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Deleted"
          message="Recipe has been deleted!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          contentContainerStyle={styles.alertContainer}
          onConfirmPressed={hideAlert}
        />
        <View style={{ marginBottom: 20 }}>
          {isLoading ? (
            <View style={styles.recipeWrapper}>
              <Skeleton style={{ width: 80, height: 80, borderRadius: 16 }} />
              <View style={{ marginTop: 5, marginLeft: 10 }}>
                <Skeleton.Text h={16} w={120} />
              </View>
            </View>
          ) : getRecipe.length === 0 ? (
            <Text style={styles.noRecipeText}>No recipes found.</Text>
          ) : (
            getRecipe.map((item) => (
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
                  <TouchableOpacity onPress={() => goToEditRecipes(item.id)}>
                    <FeatherIcon style={styles.editIcon} name="edit" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <FeatherIcon style={styles.deleteIcon} name="trash" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
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
  alertContainer: {
    width: 350,
    borderRadius: 10,
    padding: 20,
  },
  editIcon: {
    color: "black",
    fontSize: 24,
  },
  deleteIcon: {
    color: "red",
    fontSize: 24,
    marginLeft: 10,
  },
  noRecipeText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});

export default MyRecipes;
