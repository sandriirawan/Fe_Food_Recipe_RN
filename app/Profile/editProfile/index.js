import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Button, Input, Icon, VStack, Pressable, Modal } from "native-base";
import React, { useEffect, useState } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { EXPO_PUBLIC_API_URL } from "@env";

export default function EditProfile() {
  const route = useRoute();
  const { userId } = route.params;
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${EXPO_PUBLIC_API_URL}/users/${userId}`
        );
        const userData = response.data.data[0];
        setName(userData.name);
        setPhoto(userData.photo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (photo) {
        formData.append("photo", {
          uri: photo,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      const response = await axios.put(
        `${EXPO_PUBLIC_API_URL}/users/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigation.navigate("profile", { userId });
    } catch (error) {
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
          Edit Profile
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#6D61F2"
            style={{ marginTop: 30 }}
          />
        ) : (
          <React.Fragment>
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{
                  width: 94,
                  height: 94,
                  marginBottom: 40,
                  marginTop: 30,
                  borderRadius: 47,
                }}
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
                  marginBottom: 40,
                  marginTop: 30,
                }}
              />
            )}

            <Input
              w="319"
              h="60"
              borderRadius={10}
              marginBottom={4}
              borderBottomWidth={1}
              borderColor="#C4C4C4"
              backgroundColor="white"
              InputLeftElement={
                <Icon
                  as={<FeatherIcon name="user" />}
                  size={7}
                  ml="2"
                  color="#C4C4C4"
                />
              }
              placeholder="name"
              placeholderTextColor="#C4C4C4"
              value={name}
              onChangeText={setName}
            />
            <Button
              w="319"
              h="60"
              borderRadius={10}
              borderBottomWidth={1}
              borderColor="#C4C4C4"
              backgroundColor="white"
              onPress={() => setIsModalOpen(true)}
              // onPress={handlePickPhoto}
            >
              <Icon
                as={<FeatherIcon name="image" />}
                size={7}
                color="#C4C4C4"
              />
            </Button>

            <VStack space={4} alignItems="center">
              <Pressable
                w={183}
                mt="30"
                backgroundColor="#EFC81A"
                borderRadius={10}
                onPress={handleSubmit}
                style={{ height: 40, justifyContent: "center" }}
                _pressed={{ backgroundColor: "#FFD700" }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>Edit</Text>
              </Pressable>
            </VStack>
          </React.Fragment>
        )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
