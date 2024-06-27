import './App.css';
import Navigation from "./components/Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Pets from "./components/Pets/Pets";
import Users from "./components/Users/Users";
import Reviews from "./components/Reviews/Reviews";
import Managers from "./components/Managers/Managers";
import Admins from "./components/Admins/Admins";
import Messages from "./components/Messages/Messages";
import PetMateRequests from "./components/Pet-mate-requests/PetMateRequests";
import PetMateMatches from "./components/Pet-mate-matches/PetMateMatches";

function App() {
  return (
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pets" element={<Pets />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/reviews" element={<Reviews />} />
          <Route exact path="/managers" element={<Managers />} />
          <Route exact path="/admins" element={<Admins />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/petmaterequests" element={<PetMateRequests />} />
          <Route exact path="/petmatematches" element={<PetMateMatches />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;