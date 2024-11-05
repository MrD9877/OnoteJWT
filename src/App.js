import './App.css';
import LoginPage from './components/LoginPage.js';
import SigninPage from './components/SigninPage.js';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth.js';
import PageNotFound from './components/PageNotFound.js';
import ServerDown from './components/ServerDown.js';
import Home from './components/Home.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';





function App() {


  return (
    <>

      <Routes>
        <Route path='/Onote' element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
      </Routes>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/serverdown' element={<ServerDown />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/auth/*' element={<Auth />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
