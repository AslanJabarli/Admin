import {BrowserRouter} from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import MyLayout from './Components/Layout/Layout';
import Routing from "./Components/Layout/Routing";
import {LoginUser , LogOutUser , getUser} from './redux/actions'
import Login from './Components/Layout/Login';
import { useTranslation } from 'react-i18next';
import Loader from './Components/Elements/Loader';

function App(props) {
  const {LogOutUser , LoginUser , loggedIn , user , loading , getUser} = props
  let token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token') 
 
          
  const { i18n } = useTranslation();
 

  useEffect(()=>{
    let lang =  localStorage.getItem('locale')
    
    if(lang){
      i18n.changeLanguage(lang)
    }

    if(token){
      getUser()
    }
    else{
      LogOutUser()
    }
  } , [])


  return (
   <>
    {loading ?
          <Loader/> : null
    }
     <BrowserRouter>
      <>   
        {loggedIn ? 
           <MyLayout>
            <div className="App">
                <Routing/>
            </div>
           </MyLayout> : 
           <Login/>
        }
      </>
    </BrowserRouter>
   </>

  );
}



const mapStateToProps = ({user , loading}) => {
  return {
    user: user.data,
    loggedIn : user.isLoggedIn,
    loading
  }
}


export default connect(mapStateToProps , {LoginUser , LogOutUser , getUser})(App)

