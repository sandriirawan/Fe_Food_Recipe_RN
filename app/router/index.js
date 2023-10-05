import { createStackNavigator } from "@react-navigation/stack";
import Home from "../home";
import Login from "../auth/login";
import Register from "../auth/register";
import Upload from "../upload/upload";
import Profile from "../Profile/index";
import MyRecipes from "../Profile/myRecipes/index";
import SavedRecipes from "../Profile/savedRecipes/index";
import LikedRecipes from "../Profile/likedRecipes/index";
import Detail from "../detail/index";
import Video from "../detail/video/index";
import EditProfile from "../Profile/editProfile/index";
import EditRecipes from "../Profile/myRecipes/editRecipes/index";
import Search from "../home/search";
import { useEffect } from "react";
import { LogBox } from "react-native";

const Stack = createStackNavigator();

const AppNavigator = () => {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="upload"
        component={Upload}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="edit"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="myRecipes"
        component={MyRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="editRecipes"
        component={EditRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="saved"
        component={SavedRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="liked"
        component={LikedRecipes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="video"
        component={Video}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
