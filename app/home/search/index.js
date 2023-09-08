import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import FeatherIcon from "react-native-vector-icons/Feather";
import Navbar from "../../../components/Navbar";
import { getRecipes } from "../../../config/Redux/Action/recipeAction";
import { ActivityIndicator } from "react-native";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true); // State to track loading status

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = getRecipe.filter((recipe) =>
      recipe.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getRecipes())
        .then(() => setLoading(false)) 
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); 
        });
    }
  }, [dispatch, isFocused]);

  const getRecipe = useSelector((state) => state.recipe.recipe);
  const [filteredRecipes, setFilteredRecipes] = useState(getRecipe);

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
    const filtered = getRecipe.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const goToDetail = (recipeId) => {
    navigation.navigate("detail", { recipeId });
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
            />
            <TextInput
              style={styles.input}
              placeholder="Search Pasta, Bread, etc"
              placeholderTextColor="#C4C4C4"
              onChangeText={handleSearch}
              value={searchText}
            />
          </View>

          <View style={styles.imageContainer}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#6D61F2"
                style={{ marginTop: 20 }}
              />
            ) : (
              filteredRecipes.map((recipe) => (
                <TouchableWithoutFeedback
                  key={recipe.id}
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
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
    paddingBottom: 100,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
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
  },
  input: {
    flex: 1,
    marginLeft: 5,
    color: "black",
  },
  searchIcon: {
    marginRight: 5,
  },
});

export default Search;
