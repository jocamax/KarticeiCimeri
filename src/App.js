import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import OglasiCimer from './pages/OglasiCimer';
import Profile from './pages/Profile'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword'
import NavBar from './components/NavBar';
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoutes';
import 'react-toastify/dist/ReactToastify.css'
import CreateOglas from './pages/CreateOglas';
import OglasiKartice from './pages/OglasiKartice';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/oglasic' element={<OglasiCimer/>}></Route>
      <Route path='/profile' element={<ProtectedRoute/>}>
      <Route path='/profile' element={<Profile/>}></Route>
      </Route>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path='/sign-up' element={<SignUp/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/napravi-oglas' element={<CreateOglas/>}></Route>
      <Route path='/oglasi-kartice' element={<OglasiKartice/>}></Route>
    </Routes>
    <Footer/>
     </BrowserRouter>
     <ToastContainer
     position='bottom-center'
     hideProgressBar='true'
     autoClose={3000}
     />
    </>
  );
}

export default App;
