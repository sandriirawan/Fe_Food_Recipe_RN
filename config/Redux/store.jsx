import { applyMiddleware,createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/rootReducer";
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;