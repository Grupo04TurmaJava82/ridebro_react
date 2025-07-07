import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ViagensPopulares from './components/viagens/ViagemCadastradas';
import About from './pages/About';
import VeiculosCadastrados from './components/veiculos/VeiculosCadastrados';
import FormViagem from './components/viagem/formviagem/FormViagem';
import FormVeiculo from './components/veiculo/formveiculo/FormVeiculo';
import Sobre from './components/sobre/Sobre';



function App() {
  return (
    
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/viagem" element={<ViagensPopulares />} />
            <Route path="/veiculo" element={<VeiculosCadastrados/>} />
            <Route path="/sobre" element={
              <>
                <About />
                <Sobre />
              </>
              } />
            <Route path="/cadastroVeiculo" element={<FormVeiculo />} />
            <Route path="/cadastroViagem" element={<FormViagem />} />
            <Route path="/equipe" element={<Sobre />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
