import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import {
  NativeBaseProvider,
  Button,
  VStack,
  Link,
  Input,
  Icon,
  Stack,
  TextArea,
  useToast,
} from "native-base";
import Navbar from "../../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";


export default function Upload() {
  const toast = useToast();
  const navigation = useNavigation();
  const goToHome = () => {
    navigation.navigate("home");
  };

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("title_video", videoTitle);
      formData.append("video", youtubeLink);
      formData.append("users_id", userId);
      if (photo) {
        formData.append("photo", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      const response = await axios.post(
        `${API_URL}/recipes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTitle("");
      setIngredients("");
      setVideoTitle("");
      setYoutubeLink("");
      setPhoto(null);
      toast.show({
        title: "Create Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      error.response?.data?.message || "Unknown error occurred";
      alert("Create error:", errorMessage);
      console.error("Error:", error);
    }
  };

  const handlePickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <FeatherIcon
          style={{
            color: "#999999",
            fontSize: 34,
            textAlign: "left",
            marginTop: 20,
          }}
          name="arrow-left"
          onPress={goToHome}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.main}>
            <Text style={styles.welcome}>Add Your Recipe</Text>
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
                  style={{ width: 300, height: 150, borderRadius: 15 }}
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
            </Stack>
            <VStack space={4} alignItems="center">
              <Button
                w={183}
                mt="50"
                backgroundColor="#EFC81A"
                borderRadius={10}
                onPress={handleSubmit}
              >
                POST
              </Button>
            </VStack>
          </View>
        </ScrollView>
      </View>
      <View>
        <Navbar />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
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
    marginTop: 5,
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
