import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  NativeBaseProvider,
  TextArea,
  VStack,
  Button,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { Menu, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { createLikeds } from "../../config/Redux/Action/LikedsAction";
import { createBookmarks } from "../../config/Redux/Action/bookmarksAction";
import { getRecipesByid } from "../../config/Redux/Action/recipeAction";
import { EXPO_PUBLIC_API_URL } from "@env";

export default function Detail() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const { recipeId } = route.params;
  const [activeTab, setActiveTab] = useState("Ingredients");
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [commentData, setCommentData] = useState("");
  const [comment, setComment] = useState("");
  const [commentMenuVisibility, setCommentMenuVisibility] = useState({});
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const toggleCommentMenu = (commentId) => {
    setCommentMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [commentId]: !prevVisibility[commentId],
    }));
  };

  const goBack = () => {
    navigation.goBack("home");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const userId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    userId();
  }, []);

  // useEffect(() => {
  //   dispatch(getRecipesByid(userId));
  // }, [dispatch, userId, isFocused]);

  // const recipeDetail = useSelector((state) => state.recipe.recipeDetail);

  useEffect(() => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/recipes/${recipeId}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleComments = async () => {
    try {
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/comments`, {
        recipes_id: recipeId,
        users_id: userId,
        comment,
      });
      setComment("");
      getData();
      console.log("Comment berhasil:", response.data);
    } catch (error) {
      console.error("Comment gagal:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(`${EXPO_PUBLIC_API_URL}/comments/${recipeId}`)
      .then((response) => {
        setCommentData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${EXPO_PUBLIC_API_URL}/comments/${id}`)
      .then((response) => {
        console.log("comments deleted successfully");
        getData();
      })
      .catch((error) => {
        console.error("Error deleting comments:", error);
      });
  };

  const handleLikeds = async () => {
    try {
      dispatch(createLikeds(recipeId, userId));
      setLiked(true);
    } catch (error) {
      console.error("likeds gagal:", error);
    }
  };

  const handleBookmarks = async () => {
    try {
      dispatch(createBookmarks(recipeId, userId));
      setBookmark(true);
    } catch (error) {
      console.error("bookmark gagal:", error);
    }
  };

  const goToVideo = (recipeId) => {
    navigation.navigate("video", { recipeId });
  };

  const checkAllInputsFilled = () => {
    if (comment.trim() !== "") {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  useEffect(() => {
    checkAllInputsFilled();
  }, [comment]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {data.map((recipe, index) => (
          <View key={index}>
            <View style={styles.firstWrap}>
              <View>
                <Image
                  style={{ width: "100%", height: 442 }}
                  source={{ uri: recipe.photo }}
                  resizeMode="cover"
                />
              </View>
              <FeatherIcon
                style={styles.arrowIcon}
                name="arrow-left"
                onPress={goBack}
              />
              {/* <TouchableOpacity style={styles.iconContainer}>
            <FeatherIcon style={styles.bookmark} name="bookmark" />
          </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleBookmarks}
                disabled={bookmark}
              >
                <FeatherIcon
                  style={bookmark ? styles.afterBookmark : styles.bookmark}
                  name="bookmark"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleLikeds}
                disabled={liked}
              >
                <FeatherIcon
                  style={liked ? styles.afterLike : styles.like}
                  name="thumbs-up"
                />
              </TouchableOpacity>

              {/* <FeatherIcon style={styles.afterBookmark} name="bookmark" /> */}
              <Text style={styles.title}>{recipe.title}</Text>
              <Text style={styles.users}>By Chef Ronald Humson</Text>
              <View style={styles.secondWrap}></View>
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "Ingredients" && styles.activeTab,
                  ]}
                  onPress={() => handleTabChange("Ingredients")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "Ingredients" && styles.activeTabText,
                    ]}
                  >
                    Ingredients
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "StepVideo" && styles.activeTab,
                  ]}
                  onPress={() => handleTabChange("StepVideo")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "StepVideo" && styles.activeTabText,
                    ]}
                  >
                    Video Step
                  </Text>
                </TouchableOpacity>
              </View>
              {activeTab === "Ingredients" && (
                <View style={styles.tabContent}>
                  <View style={styles.Ingredients}>
                    <Text
                      style={{ padding: 20, fontSize: 14, color: "#666666" }}
                    >
                      {recipe.ingredients}
                    </Text>
                  </View>
                </View>
              )}
              {activeTab === "StepVideo" && (
                <View style={styles.tabContent2}>
                  <TouchableOpacity style={styles.StepVideo}>
                    <View style={styles.icon}>
                      <FeatherIcon
                        style={{
                          color: "white",
                          fontSize: 24,
                        }}
                        name="play"
                        onPress={() => goToVideo(recipeId)}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#666666",
                        marginTop: 10,
                      }}
                      onPress={() => goToVideo(recipeId)}
                    >
                      Step 1
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.StepVideo}>
                    <View style={styles.icon}>
                      <FeatherIcon
                        style={{
                          color: "white",
                          fontSize: 24,
                        }}
                        name="play"
                        onPress={() => goToVideo(recipeId)}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#666666",
                        marginTop: 10,
                      }}
                      onPress={() => goToVideo(recipeId)}
                    >
                      Step 2
                    </Text>
                  </View>
                  <NativeBaseProvider>
                    <TextArea
                      h="150"
                      placeholder="Comments"
                      placeholderTextColor="#C4C4C4"
                      w="319"
                      borderRadius={10}
                      borderBottomWidth={1}
                      borderColor="#C4C4C4"
                      backgroundColor="#FAF7ED"
                      value={comment}
                      onChangeText={setComment}
                    />
                    <VStack>
                      <Pressable
                        w={319}
                        mt="5"
                        backgroundColor={
                          allInputsFilled ? "#EFC81A" : "#C4C4C4"
                        }
                        borderRadius={10}
                        onPress={handleComments}
                        _pressed={{
                          backgroundColor: allInputsFilled
                            ? "#FFD700"
                            : "#C4C4C4",
                        }}
                        style={{
                          height: 40,
                          justifyContent: "center",
                        }}
                        isDisabled={!allInputsFilled}
                      >
                        <Text style={{ color: "#fff", textAlign: "center" }}>
                          POST
                        </Text>
                      </Pressable>
                    </VStack>
                  </NativeBaseProvider>
                  <Text style={{ marginTop: 20 }}>Comment :</Text>
                  <ScrollView>
                    {commentData.map((item) => (
                      <View
                        key={item.id}
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                        }}
                      >
                        <Image
                          style={{
                            width: 42,
                            height: 42,
                            marginRight: 20,
                            borderRadius: 27,
                          }}
                          source={{ uri: item.photo }}
                        />
                        <View style={{ width: 250, height: "auto" }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Text>
                          <Text>{item.comment}</Text>
                        </View>
                        <View>
                          <Menu
                            visible={commentMenuVisibility[item.id]}
                            onDismiss={() => toggleCommentMenu(item.id)}
                            anchor={
                              <IconButton
                                style={{ marginTop: -10, marginLeft: -30 }}
                                icon="dots-horizontal"
                                onPress={() => toggleCommentMenu(item.id)}
                              />
                            }
                          >
                            <Menu.Item title="Edit" />
                            <TouchableOpacity>
                              <Menu.Item
                                title="Delete"
                                onPress={() => handleDelete(item.id)}
                              />
                            </TouchableOpacity>
                          </Menu>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  firstWrap: {
    position: "relative",
  },
  arrowIcon: {
    color: "#F5F5F5",
    fontSize: 34,
    position: "absolute",
    top: 20,
    left: 20,
  },
  title: {
    position: "absolute",
    color: "white",
    fontSize: 32,
    top: 200,
    left: 20,
    width: 149,
    height: 84,
  },
  users: {
    position: "absolute",
    top: 300,
    left: 20,
    color: "#B0B0B0",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  bookmark: {
    position: "absolute",
    color: "#EEC302",
    backgroundColor: "white",
    top: 280,
    right: 20,
    fontSize: 24,
    width: 36,
    height: 36,
    borderRadius: 50,
    textAlign: "center",
    padding: 5,
  },
  afterBookmark: {
    position: "absolute",
    color: "white",
    backgroundColor: "#EEC302",
    top: 280,
    right: 20,
    fontSize: 24,
    width: 36,
    height: 36,
    borderRadius: 50,
    textAlign: "center",
    padding: 5,
  },
  like: {
    position: "absolute",
    color: "#EEC302",
    backgroundColor: "white",
    top: 280,
    right: 70,
    fontSize: 24,
    width: 36,
    height: 36,
    borderRadius: 50,
    textAlign: "center",
    padding: 4,
  },
  afterLike: {
    position: "absolute",
    color: "white",
    backgroundColor: "#EEC302",
    top: 280,
    right: 70,
    fontSize: 24,
    width: 36,
    height: 36,
    borderRadius: 50,
    textAlign: "center",
    padding: 5,
  },
  secondWrap: {
    width: "100%",
    height: 380,
    backgroundColor: "white",
    marginTop: -100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: -370,
    width: "65%",
    paddingLeft: 28,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomColor: "#EEC302",
    borderBottomWidth: 5,
  },
  tabText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "bold",
  },
  activeTabText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  tabContent: {
    paddingLeft: 40,
    paddingTop: 20,
    height: 420,
  },
  tabContent2: {
    paddingLeft: 40,
    paddingTop: 20,
    height: "auto",
    paddingBottom: 50,
  },
  Ingredients: {
    width: 319,
    height: "auto",
    backgroundColor: "#FAF7ED",
  },
  StepVideo: {
    backgroundColor: "#FAF7ED",
    width: 319,
    height: "auto",
    padding: 12,
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: {
    backgroundColor: "#EEC302",
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginRight: 30,
  },
});
