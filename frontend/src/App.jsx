import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import MainPage from './pages/mainPage';
import ViewCart from './pages/viewCartPage';

export default function App() {
  return(
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/ViewCart' element={<ViewCart />} />
      </Routes>
    </Router>
  )
}