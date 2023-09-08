import { combineReducers } from "redux";
import likedsReducer from "./likedsReducer";
import bookmarksReducer from "./bookmarksReduces";
import recipeReducer from "./recipesReducer";


const rootReducer = combineReducers({
    liked : likedsReducer,
    bookmark: bookmarksReducer,
    recipe: recipeReducer,
    
})

export default rootReducer;