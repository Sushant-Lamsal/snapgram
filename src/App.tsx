//this is a primary router component

//Routes component wraps the different Route components. It is used to define the different routes of the application.Each Route component defines a specific path ("/", "/about", "/contact") and the corresponding component (<Home />, <About />, <Contact />) to render when that path is accessed.
import {Routes , Route} from 'react-router-dom';
import "./globals.css"
import SigninForm from './_auth/forms/SigninForm';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile, } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* creating a route there are two types public routes eg: signup signin page and another is private route eg : dashboard or something after you signed in */}

        {/* Public Route */}
        {/* non-self closing route so that we can render the layout component and the signin and signup form in the same page it is accepting element  */}
        <Route element={<AuthLayout/>}>
        
        {/* Route is a self closing component it is given path of / and element is given as a component which is imported from the components folder which gets rendered  */}
        <Route path = '/sign-in' element={<SigninForm />}/>
        <Route path = '/sign-up' element={<SignupForm />}/>
        </Route>

        {/* Private Route */}
        <Route element={<RootLayout/>}>

        {/* Index Below means that it is the starting page of the application and element to render a component in the browser  */}
        <Route index element={<Home/>} />
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/saved' element={<Saved/>}/>
        <Route path='/all-users' element={<AllUsers/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/update-post/:id' element={<EditPost/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='/profile/:id/*' element={<Profile/>}/>
        <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
        </Route>
      </Routes>
      <Toaster />
    </main>
    )
}

export default App