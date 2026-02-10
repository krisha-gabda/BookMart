import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import LogIn from './pages/LogInPage';
import SignUp from './pages/SignUpPage';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/reset' element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}