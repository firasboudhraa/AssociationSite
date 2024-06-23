import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnexionPage from "@/pages/Connexion";
import Navb from '../components/molecules/nav'
import Home from '@/pages/Home'

export default function App() {
  return (
    <div>
        <Navb/>
      <BrowserRouter>
        <Routes>
          <Route path="/Connexion" element={<ConnexionPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
