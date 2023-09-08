import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./router/index";



const App = () => {
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NativeBaseProvider>
    </PaperProvider>
  );
};

export default App;
