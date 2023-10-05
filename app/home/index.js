import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  BackHandler,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Navbar from "../../components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getRecipes } from "../../config/Redux/Action/recipeAction";
import { useDispatch, useSelector } from "react-redux";
import FeatherIcon from "react-native-vector-icons/Feather";
import Pagination from "react-native-pagination";
import { TouchableOpacity } from "react-native";
import { Skeleton } from "native-base";

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(getRecipes());
    }
  }, [dispatch, isFocused]);

  const getRecipe = useSelector((state) => state.recipe.recipe);

  const fetchData = async () => {
    try {
      dispatch(getRecipes());
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getRecipes());
    fetchData();
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Konfirmasi", "Apakah Anda ingin keluar dari aplikasi?", [
          {
            text: "Tidak",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Ya", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const goToDetail = (recipeId) => {
    navigation.navigate("detail", { recipeId });
  };

  const goToSearch = () => {
    navigation.navigate("search");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <FeatherIcon
              name="search"
              size={20}
              color="#C4C4C4"
              style={styles.searchIcon}
              onPress={goToSearch}
            />
            <Text onPress={goToSearch} style={styles.input}>
              Search Pasta, Bread, etc
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Text style={{ fontSize: 18, marginTop: 20 }}>New Recipes</Text>
            <View style={styles.imageWrapper}>
              {getRecipe.length === 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{ marginRight: 20 }}>
                    <Skeleton h={160} w={130} />
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Skeleton h={160} w={130} />
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Skeleton h={160} w={130} />
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Skeleton h={160} w={130} />
                  </View>
                </ScrollView>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getRecipe
                    .slice()
                    .reverse()
                    .map((recipe) => (
                      <TouchableWithoutFeedback
                        key={recipe.id}
                        onPress={() => goToDetail(recipe.id)}
                      >
                        <View style={{ marginRight: 20 }}>
                          <Image
                            style={{
                              width: 130,
                              height: 160,
                              position: "relative",
                              borderRadius: 15,
                            }}
                            source={{ uri: recipe.photo }}
                          />
                          <Text
                            style={{
                              position: "absolute",
                              top: 100,
                              color: "white",
                              fontSize: 14,
                              fontWeight: "500",
                              width: 61,
                              left: 10,
                              overflow: "hidden",
                            }}
                          >
                            {recipe.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 20,
              }}
            >
              <Text style={{ fontSize: 18, marginTop: 20 }}>
                Popular Recepies
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 18, marginTop: 20, color: "#6D61F2" }}
                  onPress={goToSearch}
                >
                  More Info
                </Text>
              </TouchableOpacity>
            </View>

            {getRecipe.length === 0 ? (
              <>
                <View style={styles.recipeWrapper}>
                  <Skeleton
                    style={{ width: 64, height: 64, borderRadius: 16 }}
                  />
                  <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Skeleton.Text h={16} w={120} />
                  </View>
                </View>
                <View style={styles.recipeWrapper}>
                  <Skeleton
                    style={{ width: 64, height: 64, borderRadius: 16 }}
                  />
                  <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Skeleton.Text h={16} w={120} />
                  </View>
                </View>
                <View style={styles.recipeWrapper}>
                  <Skeleton
                    style={{ width: 64, height: 64, borderRadius: 16 }}
                  />
                  <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Skeleton.Text h={16} w={120} />
                  </View>
                </View>
              </>
            ) : (
              getRecipe
                .slice(
                  (currentPage - 1) * recipesPerPage,
                  currentPage * recipesPerPage
                )
                .map((recipe, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => goToDetail(recipe.id)}
                  >
                    <View style={styles.recipeWrapper}>
                      <Image
                        style={{ width: 64, height: 64, borderRadius: 16 }}
                        source={{ uri: recipe.photo }}
                      />
                      <View style={{ marginTop: 5, marginLeft: 10 }}>
                        <Text style={{ fontSize: 16 }}>{recipe.title}</Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <MaterialIcons
                            style={{
                              marginTop: 10,
                              color: "#FFB200",
                              fontSize: 15,
                            }}
                            name="star"
                          />
                          <Text style={{ marginTop: 10, marginLeft: 5 }}>
                            4.6
                          </Text>
                        </View>
                      </View>
                      <Pagination
                        totalItemsCount={getRecipe.length}
                        itemsCountPerPage={recipesPerPage}
                        activePage={currentPage}
                        onChange={handlePageChange}
                        innerClass="pagination"
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ))
            )}
          </View>
        </View>
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    // paddingRight: 28,
    paddingTop: 20,
    backgroundColor: "white",
    paddingBottom: 100,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
  },
  imageWrapper: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeWrapper: {
    flexDirection: "row",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#EFEFEF",
    width: 355,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "#C4C4C4",
  },
  searchIcon: {
    marginRight: 5,
  },
});

export default Home;
