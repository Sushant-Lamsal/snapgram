import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import {createContext , useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

//declaring initial user state
export const INITIAL_USER = {
  id : '',
  name: '',
  username : '',
  email : '',
  imageUrl:'',
  bio:''
}
//declaring initial authentication state
const INITIAL_STATE = {
  user : INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser : () => {},
  setIsAuthenticated : () => {},
  checkAuthUser: async () => false as boolean,
}
//creating context
const AuthContext = createContext<IContextType>(INITIAL_STATE)

//creating provider
const AuthProvider = ({children}: {children : React.ReactNode}) => {
  //declaring initial state 
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  //checking if the user has clicked a button to login or not
  const [isLoading, setIsLoading] = useState(false);
  //checking if the user is authenticated or not
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //to navigate to different pages
  const navigate = useNavigate();


  //Check if the user is already authenticated and navigate to the root if authenticated else show err or navigate to sign in/up page
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if(currentAccount){
        setUser({
          id : currentAccount.$id,
          name : currentAccount.name,
          username : currentAccount.username,
          email : currentAccount.email,
          imageUrl : currentAccount.imageUrl,
          bio : currentAccount.bio
        })
        setIsAuthenticated(true);
        return true;
      }
      return false;

    } catch (error) {
      console.log(error)
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (
      //check if the user is already logged in if logged in navigate to root
      localStorage.getItem('cookieFallback') === '[]'  ||
      //check if the user is already logged in if not navigate to sign in page
      localStorage.getItem('cookieFallback') === null 
    ) navigate('/sign-in')
    checkAuthUser();
  }, [])
  //declaring value fot the authentication context
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }
  //returning the provider with the value to be used in the app and passing children as props
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)