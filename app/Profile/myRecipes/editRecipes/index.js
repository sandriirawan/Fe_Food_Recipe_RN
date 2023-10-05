import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  NativeBaseProvider,
  Button,
  VStack,
  Input,
  Icon,
  Stack,
  TextArea,
  useToast,
} from "native-base";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import {
  getRecipesByid,
  updateRecipes,
} from "../../../../config/Redux/Action/recipeAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditRecipes = ({ updateRecipes }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const route = useRoute();
  const { recipeId } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(getRecipesByid(recipeId));
  }, [dispatch, recipeId, isFocused]);
  const recipeDetail = useSelector((state) => state.recipe.recipeDetail);
  const [title, setTitle] = useState(recipeDetail[0]?.title);
  const [ingredients, setIngredients] = useState(recipeDetail[0]?.ingredients);
  const [videoTitle, setVideoTitle] = useState(recipeDetail[0]?.title_video);
  const [youtubeLink, setYoutubeLink] = useState(recipeDetail[0]?.video);
  const [photo, setPhoto] = useState(recipeDetail[0]?.photo);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("title_video", videoTitle);
      formData.append("video", youtubeLink);
      if (photo) {
        formData.append("photo", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }
      await updateRecipes(recipeId, formData);
      toast.show({
        title: "Update Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      const userId = await AsyncStorage.getItem("userId");
      navigation.navigate("myRecipes", { userId });
      // alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handlePickPhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Izinkan Camera!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setPhoto(pickerResult.uri);
    }
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        await dispatch(getRecipesByid(recipeId));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [dispatch, recipeId]);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", paddingTop: 20 }}>
            <FeatherIcon
              style={{
                color: "#999999",
                fontSize: 34,
                textAlign: "left",
                marginRight: 90,
              }}
              name="arrow-left"
              onPress={goBack}
            />
            <Text style={styles.welcome}>Edit Recipe</Text>
          </View>

          <View style={styles.main}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#6D61F2"
                style={{ marginTop: 20 }}
              />
            ) : (
              <Stack space={4} w="100%" alignItems="center" mt={10}>
                <Input
                  w="319"
                  h="60"
                  borderRadius={10}
                  borderBottomWidth={1}
                  borderColor="#C4C4C4"
                  backgroundColor="white"
                  InputLeftElement={
                    <Icon
                      as={<FeatherIcon name="book-open" />}
                      size={7}
                      ml="2"
                      color="#C4C4C4"
                    />
                  }
                  placeholder="Title"
                  placeholderTextColor="#C4C4C4"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextArea
                  h="200"
                  placeholder="Description"
                  placeholderTextColor="#C4C4C4"
                  w="319"
                  borderRadius={10}
                  borderBottomWidth={1}
                  borderColor="#C4C4C4"
                  backgroundColor="white"
                  value={ingredients}
                  onChangeText={setIngredients}
                />
                {photo && (
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 300, height: 200, borderRadius: 15 }}
                  />
                )}
                <Button
                  w="319"
                  h="60"
                  borderRadius={10}
                  borderBottomWidth={1}
                  borderColor="#C4C4C4"
                  backgroundColor="white"
                  onPress={handlePickPhoto}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      as={<FeatherIcon name="image" />}
                      size={7}
                      color="#C4C4C4"
                      mr={2}
                    />
                    <Text style={{ color: "#C4C4C4", fontWeight: "bold" }}>
                      Add Image
                    </Text>
                  </View>
                </Button>

                <Input
                  w="319"
                  h="60"
                  borderRadius={10}
                  borderBottomWidth={1}
                  borderColor="#C4C4C4"
                  backgroundColor="white"
                  InputLeftElement={
                    <Icon
                      as={<FeatherIcon name="youtube" />}
                      size={7}
                      ml="2"
                      color="#C4C4C4"
                    />
                  }
                  placeholder="Add Link Youtube"
                  placeholderTextColor="#C4C4C4"
                  value={youtubeLink}
                  onChangeText={setYoutubeLink}
                />
                <Input
                  w="319"
                  h="60"
                  borderRadius={10}
                  borderBottomWidth={1}
                  borderColor="#C4C4C4"
                  backgroundColor="white"
                  InputLeftElement={
                    <Icon
                      as={<FeatherIcon name="video" />}
                      size={7}
                      ml="2"
                      color="#C4C4C4"
                    />
                  }
                  placeholder="Title Video"
                  placeholderTextColor="#C4C4C4"
                  value={videoTitle}
                  onChangeText={setVideoTitle}
                />
              </Stack>
            )}
            <VStack space={4} alignItems="center">
              <TouchableOpacity>
                <Button
                  w={183}
                  mt="5"
                  backgroundColor="#EFC81A"
                  borderRadius={10}
                  onPress={handleSubmit}
                  style={{ marginBottom: 50 }}
                >
                  UPDATE
                </Button>
              </TouchableOpacity>
            </VStack>
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
};

export default connect(null, { updateRecipes })(EditRecipes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    backgroundColor: "#EFEFEF",
  },
  main: {
    // justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  welcome: {
    color: "#EFC81A",
    fontSize: 24,

    fontWeight: "bold",
  },
  scrollContent: {
    flexGrow: 1,
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
