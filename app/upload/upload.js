import React, { useEffect, useState } from "react";
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
  Pressable,
  Modal,
} from "native-base";
import Navbar from "../../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_URL } from "@env";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        `${EXPO_PUBLIC_API_URL}/recipes`,
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
      const errorMessage =
        error.response?.data?.message || "Unknown error occurred";
      alert("Create error: " + errorMessage);
      console.error("Error:", error);
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
    setIsModalOpen(false); 
  };

  const takePhotoWithCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Izinkan Akses Kamera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setPhoto(pickerResult.uri);
    }
    setIsModalOpen(false); 
  };

  const cancelPhoto = () => {
    setIsModalOpen(false); 
  };

  const checkAllInputsFilled = () => {
    if (
      title.trim() !== "" &&
      ingredients.trim() !== "" &&
      videoTitle.trim() !== "" &&
      youtubeLink.trim() !== "" &&
      photo !== null
    ) {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  useEffect(() => {
    checkAllInputsFilled();
  }, [title, ingredients, videoTitle, youtubeLink, photo]);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.main}>
            <View style={{ flexDirection: "row", height: 48 }}>
              {/* <FeatherIcon
              style={{
                color: "#999999",
                fontSize: 34,
              }}
              name="arrow-left"
              onPress={goToHome}
            /> */}
              <Text style={styles.welcome}>Add Your Recipe</Text>
            </View>
            <Stack space={4} w="100%" alignItems="center">
              <Input
                w="319"
                h="60"
                mt="5"
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
                  style={{
                    width: 300,
                    height: 221,
                    borderRadius: 15,
                    objectFit: "cover",
                  }}
                />
              )}
              <Button
                w="319"
                h="60"
                borderRadius={10}
                borderBottomWidth={1}
                borderColor="#C4C4C4"
                backgroundColor="white"
                onPress={() => setIsModalOpen(true)}
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
              <Pressable
                w={319}
                mt="5"
                backgroundColor={allInputsFilled ? "#EFC81A" : "#C4C4C4"}
                borderRadius={10}
                _pressed={{
                  backgroundColor: allInputsFilled ? "#FFD700" : "#C4C4C4",
                }}
                style={{
                  height: 50,
                  justifyContent: "center",
                }}
                isDisabled={!allInputsFilled}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  POST
                </Text>
              </Pressable>
            </VStack>
          </View>
        </ScrollView>
      </View>
      <View>
        <Navbar />
      </View>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Add Image</Modal.Header>
          <Modal.Body>
            <Button w="100%" mb={2} onPress={handlePickPhoto}>
              Choose from Library
            </Button>
            <Button w="100%" mb={2} onPress={takePhotoWithCamera}>
              Take Photo
            </Button>
            <Button w="100%" onPress={cancelPhoto}>
              Cancel
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "#EFEFEF",
  },
  main: {
    alignItems: "center",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 100,
  },
  welcome: {
    color: "#EFC81A",
    fontSize: 24,
    flex: 1,
    textAlign: "center",
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
