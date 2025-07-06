import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ViagensPopulares from './components/viagens/ViagemCadastradas';
import VeiculosCadastrados from './components/veiculos/VeiculosCadastrados';



function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/viagenspopulares" element={<ViagensPopulares />} />
            <Route path="/veiculoscadastrados" element={<VeiculosCadastrados />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;