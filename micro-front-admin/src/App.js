import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import './App.css';
import Login from './login/login';
import Home from './pages/home';
import Sidebar from './components/sidebar/sidebar';
import AddAdmin from './pages/AddAdmin';
import ShowCar from './pages/voitures/ShowCar';
import UpdateCar from './pages/voitures/UpdateCar';
import AddCar from './pages/voitures/AddCar';
import AddUser from './pages/user/AddUser';
import ShowUser from './pages/user/ShowUser';
import ShowReservations from './pages/reservation/ShowReservation';




function App() {
  return (
    <Router>
      <Sidebar/>
    <Routes>
      <Route path="/home"  element={<Home/>} />
      <Route path="/addadmin" element={<AddAdmin/>} />
      <Route path="/cars" element={<ShowCar/>} />
      <Route path="/updatecar/:id" element={<UpdateCar/>} />
      <Route path="/addcar" element={<AddCar/>} />
      <Route path="/adduser" element={<AddUser/>} />
      <Route path="/users" element={<ShowUser/>} />
      <Route path="/reservations" element={<ShowReservations/>} />
      <Route path="/"  element={<Login/>} />
    </Routes>
  </Router>
  );
}

export default App;
