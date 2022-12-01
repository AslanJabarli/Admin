import { notification } from "antd";
import { 
    USER_LOGGED_IN,
    USER_LOG_OUT,
    LOADING_OFF,
    LOADING_ON
} from "../types";

const InithialUser = {
    isLoggedIn: false,
    data:{},
}


export const userReducer = (user = InithialUser , action) =>{
    switch (action.type){
        case USER_LOGGED_IN:
            return action.payload
        case USER_LOG_OUT :
            return action.payload
        default :
            return user;
    }
}


export const loaderReducer = (loading = false , action) =>{
    switch (action.type){
        case LOADING_ON:
            return true
        case LOADING_OFF:
            return false
        default :
            return loading;
    }
}




