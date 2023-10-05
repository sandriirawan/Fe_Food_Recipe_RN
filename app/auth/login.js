import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {
  Center,
  NativeBaseProvider,
  Button,
  VStack,
  Link,
  Input,
  Icon,
  Stack,
  Pressable,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { StackActions } from "@react-navigation/native";
import { EXPO_PUBLIC_API_URL } from "@env";

export default function Login() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allInputsFilled, setAllInputsFilled] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const register = () => {
    navigation.navigate("register");
  };

  const handleLogin = async () => {
    const data = {
      email: email,
      confirmpassword: confirmpassword,
    };
    try {
      const response = await axios.post(
        `${EXPO_PUBLIC_API_URL}/users/login`,
        data
      );
      if (response) {
        const userId = response.data.data.id;
        const userToken = response.data.data.token;
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("userToken", userToken);

        // navigation.dispatch(StackActions.replace("home"));
        navigation.reset({
          routes: [{ name: "home" }],
        });
        setEmail("");
        setConfirmpassword("");

        toast.show({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Unknown error occurred";
      console.error("Login error:", errorMessage);
      setErrorMessage(errorMessage);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (userToken) {
          navigation.navigate("home");
        }
      } catch (error) {
        console.error("Error checking user token:", error);
      }
    };
    checkToken();
  }, [navigation]);

  const hideErrorAlert = () => {
    setShowErrorAlert(false);
  };

  const checkAllInputsFilled = () => {
    if (email.trim() !== "" && confirmpassword.trim() !== "") {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  useEffect(() => {
    checkAllInputsFilled();
  }, [email, confirmpassword]);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.iconContainer}>
            <FeatherIcon name="user" style={styles.icon} />
          </View>
          <Text style={styles.welcome}>Welcome !</Text>
          <Text style={styles.description}>
            Log in to your existing account.
          </Text>
          <Stack space={4} w="100%" alignItems="center" mt={10}>
            <Input
              w="319"
              h="60"
              borderRadius={10}
              borderBottomWidth={1}
              borderColor="#C4C4C4"
              backgroundColor="#F5F5F5"
              InputLeftElement={
                <Icon
                  as={<FeatherIcon name="user" />}
                  size={7}
                  ml="2"
                  color="#C4C4C4"
                />
              }
              placeholder="examplexxx@gmail.com"
              placeholderTextColor="#C4C4C4"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              w="319"
              h="60"
              borderRadius={10}
              borderBottomWidth={1}
              borderColor="#C4C4C4"
              backgroundColor="#F5F5F5"
              type={show ? "text" : "password"}
              InputLeftElement={
                <Icon
                  as={<FeatherIcon name="lock" />}
                  size={7}
                  ml="2"
                  color="#C4C4C4"
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="#C4C4C4"
                  />
                </Pressable>
              }
              placeholder="Password"
              placeholderTextColor="#C4C4C4"
              value={confirmpassword}
              onChangeText={(text) => setConfirmpassword(text)}
            />
          </Stack>

          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </View>
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
              onPress={handleLogin}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                LOG IN
              </Text>
            </Pressable>
          </VStack>
          <Text style={styles.signUp}>
            Don’t have an account?{" "}
            <TouchableOpacity>
              <Text
                onPress={register}
                style={{ color: "#EFC81A", fontSize: 12 }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
      <AwesomeAlert
        show={showErrorAlert}
        showProgress={false}
        title="Login Error"
        message={errorMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#FF0000"
        onConfirmPressed={hideErrorAlert}
        contentContainerStyle={styles.alertContainer}
      />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    textAlign: "center",
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#C4C4C4",
    borderRadius: 90,
    padding: 20,
  },
  icon: {
    fontSize: 123,
    color: "#fff",
  },
  welcome: {
    color: "#EFC81A",
    fontSize: 18,
    marginTop: 20,
  },
  description: {
    fontSize: 12,
    color: "#C4C4C4",
  },
  forgotPasswordContainer: {
    marginLeft: 220,
  },
  forgotPassword: {
    fontSize: 12,
    color: "#999999",
    marginTop: 12,
  },
  signUp: {
    fontSize: 12,
    marginTop: 20,
    color: "#999999",
  },
  link: {
    color: "#EFC81A",
    fontSize: 12,
    marginTop: 20,
  },
  alertContainer: {
    width: 350,
    borderRadius: 10,
    padding: 20,
  },
});
