import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import YouTube from "react-native-youtube-iframe";
import axios from "axios";
import { parseISO, formatDistanceToNow } from "date-fns";
import { EXPO_PUBLIC_API_URL } from "@env";

export default function VideoScreen() {
  const route = useRoute();
  const { recipeId } = route.params;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [videoUrl, setVideoUrl] = useState("");
  const [data, setData] = useState([]);
  console.log(videoUrl);

  useEffect(() => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/recipes/${recipeId}`)
      .then((response) => {
        const videoLink = response.data.data[0].video;
        const videoId = videoLink.split("/").pop();
        const cleanVideoId = videoId.split("?")[0];
        setVideoUrl(cleanVideoId);

        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <View style={{ paddingTop: 25 }}>
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
          Step Video
        </Text>
      </View>
      <View style={styles.wrapVideo}>
        <YouTube videoId={videoUrl} height={300} width="100%" />
      </View>
      {data.map((recipe) => (
        <View style={styles.wrapTitle}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {recipe.title_video} - [Step 1]
          </Text>
          <Text>{formatDistanceToNow(parseISO(recipe.created_at))} ago</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  arrowIcon: {
    color: "#F5F5F5",
    fontSize: 24,
    position: "absolute",
    top: 20,
    left: 20,
  },
  wrapVideo: {
    marginTop: 10,
  },
  wrapTitle: {
    padding: 28,
    marginTop: -70,
  },
});
