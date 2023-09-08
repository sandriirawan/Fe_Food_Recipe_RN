import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Button, Input, Icon, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";


export default function EditProfile() {
  const route = useRoute();
  const { userId } = route.params;
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
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

      const response = await axios.put(`${API_URL}/users/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("API Response:", response.data);
      navigation.navigate("profile", { userId });
    } catch (error) {
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
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 48}}>
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
          Edit Profile
        </Text>
      </View>
      <View style={{ alignItems: "center" }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6D61F2" style={{ marginTop: 30 }} />
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
              onPress={handlePickPhoto}
            >
              <Icon as={<FeatherIcon name="image" />} size={7} color="#C4C4C4" />
            </Button>

            <VStack space={4} alignItems="center">
              <Button
                w={183}
                mt="30"
                backgroundColor="#EFC81A"
                borderRadius={10}
                onPress={handleSubmit}
              >
                Edit
              </Button>
            </VStack>
          </React.Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
