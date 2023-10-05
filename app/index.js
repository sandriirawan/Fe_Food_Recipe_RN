import React, { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./router/index";
import { Provider } from "react-redux";
import store from "../config/Redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider>
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
