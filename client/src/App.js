// import logo from './logo.svg';
import './App.css';
import  Dashboard  from './modules/Dashboard';
import  Form  from './modules/Form';
import {Routes, Route, Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children }) => {
  
   const isLoggedIn = localStorage.getItem('user:token') !== null || true;
   console.log('isLoggedIn', isLoggedIn)
   if(!isLoggedIn) {
    return <Navigate to={'users/sign_in'} />
   }
   else if(isLoggedIn && ['/users/sign_in','sign_up'].includes(window.location.href)){
    return <Navigate to={'/'} />
   }
   return children
}


function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={
    <ProtectedRoutes>
     <Dashboard/>
    </ProtectedRoutes>
   }></Route>
    
    <Route path='/users/sign_in' element={
      <ProtectedRoutes>
        <Form isSignPage={true}/>
      </ProtectedRoutes>
    }></Route>
    <Route path='/users/sign_up' element={
      <ProtectedRoutes>
        <Form isSignPage={false}/>
      </ProtectedRoutes>
    }></Route>
   </Routes>
   </>
  );
}

export default App;
