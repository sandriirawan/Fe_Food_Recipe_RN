import { StyleSheet, Text, View, Alert } from "react-native";
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { EXPO_PUBLIC_API_URL } from "@env";
import { ScrollView } from "react-native-gesture-handler";

export default function Register() {
  const toast = useToast();
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${EXPO_PUBLIC_API_URL}/users/register`,
        {
          name,
          email,
          phone,
          password,
          confirmpassword,
        }
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmpassword("");
      console.log("Registrasi berhasil:", response.data);
      toast.show({
        title: "Registration Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setShowAlert(true);
    } catch (error) {
      console.error("Registrasi gagal:", error);
    }
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const navigation = useNavigation();
  const login = () => {
    navigation.navigate("login");
  };

  const checkAllInputsFilled = () => {
    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== "" &&
      confirmpassword.trim() !== ""
    ) {
      setAllInputsFilled(true);
    } else {
      setAllInputsFilled(false);
    }
  };

  useEffect(() => {
    checkAllInputsFilled();
  }, [name, email, phone, password, confirmpassword]);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.main}>
            <Text style={styles.welcome}>Let’s Get Started !</Text>
            <Text style={styles.description}>
              Create new account to access all feautures{" "}
            </Text>

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
                    as={<FeatherIcon name="user" />}
                    size={7}
                    ml="2"
                    color="#C4C4C4"
                  />
                }
                placeholder="Name"
                placeholderTextColor="#C4C4C4"
                value={name}
                onChangeText={(text) => setName(text)}
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
                    as={<FeatherIcon name="mail" />}
                    size={7}
                    ml="2"
                    color="#C4C4C4"
                  />
                }
                placeholder="E-Mail"
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
                backgroundColor="white"
                InputLeftElement={
                  <Icon
                    as={<FeatherIcon name="phone" />}
                    size={7}
                    ml="2"
                    color="#C4C4C4"
                  />
                }
                placeholder="Phone Number"
                placeholderTextColor="#C4C4C4"
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
              <Input
                w="319"
                h="60"
                borderRadius={10}
                borderBottomWidth={1}
                borderColor="#C4C4C4"
                backgroundColor="white"
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
                placeholder="Create New Password"
                placeholderTextColor="#C4C4C4"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Input
                w="319"
                h="60"
                borderRadius={10}
                borderBottomWidth={1}
                borderColor="#C4C4C4"
                backgroundColor="white"
                type={show ? "text" : "password"}
                InputLeftElement={
                  <Icon
                    as={<FeatherIcon name="unlock" />}
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
                placeholder="New Password"
                placeholderTextColor="#C4C4C4"
                value={confirmpassword}
                onChangeText={(text) => setConfirmpassword(text)}
              />
              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Registration Success"
                message="Your account has been successfully registered."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="#14A44D"
                onConfirmPressed={hideAlert}
                contentContainerStyle={styles.alertContainer}
                onPress={login}
              />
            </Stack>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
            <VStack space={4} alignItems="center">
              <Pressable
                w={319}
                mt="5"
                backgroundColor={allInputsFilled ? "#EFC81A" : "#C4C4C4"}
                borderRadius={10}
                onPress={handleRegister}
                _pressed={{
                  backgroundColor: allInputsFilled ? "#FFD700" : "#C4C4C4",
                }}
                style={{
                  height: 50,
                  justifyContent: "center",
                }}
                isDisabled={!allInputsFilled}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  SIGN UP
                </Text>
              </Pressable>
            </VStack>
            <Text style={styles.signUp}>
              Don’t have an account?{" "}
              <TouchableOpacity>
                <Text
                  onPress={login}
                  style={{
                    color: "#EFC81A",
                    fontSize: 12,
                    textDecoration: "none",
                  }}
                >
                  Log in Here
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ScrollView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#EFEFEF",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  welcome: {
    color: "#EFC81A",
    fontSize: 24,
    marginTop: 20,
  },
  description: {
    fontSize: 12,
    color: "#C4C4C4",
  },

  forgotPassword: {
    marginLeft: 220,
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
