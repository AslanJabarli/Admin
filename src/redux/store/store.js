import {createStore , combineReducers , applyMiddleware } from 'redux'
import {
    userReducer,
    loaderReducer
} from '../reducers'
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


const rootReducer = combineReducers({
    user:userReducer,
    loading: loaderReducer
})


export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)