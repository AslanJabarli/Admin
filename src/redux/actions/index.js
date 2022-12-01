import { USER_LOGGED_IN , USER_LOG_OUT , LOADING_ON , LOADING_OFF , USER_ERROR  } from "../types";
import {api} from '../../api/api'


export const LoginUser = (email , password , remember) =>  async (dispatch) =>  {
    dispatch({ type: LOADING_ON });
    await api.post('/api/login' , {
        email,
        password
    }).then((res)=>{
        if(remember){
            localStorage.setItem('access_token' ,   res.data.token)
        }
        else{
            sessionStorage.setItem('access_token' ,   res.data.token)
        }
        dispatch( getUser() );
    })
    .catch((error) => {
        dispatch({
          type: USER_ERROR,
          payload: { message: "İstifadəçi adı və ya şifrə yanlışdır" },
        });
    })
    .finally(() => {
        dispatch({ type: LOADING_OFF });
    });
}


export const getUser = () => async (dispatch) =>{
    dispatch({ type: LOADING_ON });
    api.get('/api/users/3').then((res)=>{
        dispatch({ type: USER_LOGGED_IN , payload: {
            isLoggedIn: true,
            data: res.data.data
        }});
    }).catch((error) => {
        dispatch(LogOutUser());
    })
    .finally(() => {
        dispatch({ type: LOADING_OFF });
    });
}

export const LogOutUser = () => {
    localStorage.removeItem('access_token')
    return {
        type: USER_LOG_OUT,
        payload: {
            isLoggedIn: false,
            data:{}
        }
    }
}





