//This Layout is going to wrap the signin and signup page 

// The Navigate components are used within the Main component to navigate between different routes when the respective links are clicked.
// The Outlet component inside the Main component serves as a placeholder where child routes (About, Contact, etc.) will be rendered based on the path.
import {Outlet, Navigate} from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false ;
  return (
    <>
      {isAuthenticated ? (
      <Navigate to = "/" />
      ) : (
        <> 
        <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <Outlet />
        </section>
        <img src="/assets/images/side-img.svg" alt="logo" className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat' />
        </>
      )}
      
    </>
  )
}

export default AuthLayout