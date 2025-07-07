import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import ListaViagens from './components/viagens/listaviagens/ListaViagens';
import ListaVeiculos from './components/veiculos/listaveiculos/ListaVeiculos';
import About from './pages/About';
import FormViagem from './components/viagens/formviagens/FormViagem';
import FormVeiculo from './components/veiculos/formveiculo/FormVeiculo';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/viagem" element={<ListaViagens />} />
            <Route path="/veiculo" element={<ListaVeiculos />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/cadastroVeiculo" element={<FormVeiculo />} />
            <Route path="/cadastroViagem" element={<FormViagem />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
