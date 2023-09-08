import { createStackNavigator } from "@react-navigation/stack";
import Home from "../home";
import Login from "../auth/login";
import Register from "../auth/register";
import Upload from "../upload/upload";
import Profile from "../Profile/[id]";
import MyRecipes from "../Profile/myRecipes/[id]";
import SavedRecipes from "../Profile/savedRecipes/[id]";
import LikedRecipes from "../Profile/likedRecipes/[id]";
import Detail from "../detail/[id]";
import Video from "../detail/video/[id]";
import EditProfile from "../Profile/editProfile/[id]";
import EditRecipes from "../Profile/myRecipes/editRecipes/[id]";
import Search from "../home/search";

const Stack = createStackNavigator();

const AppNavigator = () => {
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
