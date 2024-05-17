import React from 'react';
import { Route, Routes, BrowserRouter as Router ,useLocation} from 'react-router-dom';
import LoginPage from './components/Login/Login';
import  HomePage from './components/Home/HomePage';
import { EditEmployee } from './components/UpdateEmployee/EditEmp';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './components/NotFound/PageNotFound';



function App() {
  return (    
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add-user" element={<EditEmployee/>} />
          <Route path="/home/edit-user/:id" element={<EditEmployee />} />
          <Route path= "*" element= {<PageNotFound/>} replace />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
