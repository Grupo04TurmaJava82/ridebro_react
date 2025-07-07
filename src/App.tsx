import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sobre from './components/sobre/Sobre';
import ListaViagens from './components/viagens/listaviagens/ListaViagens';
import ListaVeiculos from './components/veiculos/listaveiculos/ListaVeiculos';
import FormVeiculo from './components/veiculos/formveiculo/FormVeiculo';
import FormViagem from './components/viagens/formviagens/FormViagem';



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
            <Route path="/sobre" element={
              <>
                <About />
                <Sobre />
              </>
              } />
            <Route path="/cadastroVeiculo" element={<FormVeiculo />} />
            <Route path="/editarveiculo/:id" element={<FormVeiculo />} />
            <Route path="/cadastroViagem" element={<FormViagem />} />
            <Route path="/equipe" element={<Sobre />} />
            <Route path="/editarviagem/:id" element={<FormViagem />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
