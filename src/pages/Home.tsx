import Carrossel from "../components/carrossel/Carrossel";
import VeiculosCadastrados from "../components/veiculos/VeiculosCadastrados";
import ViagensPopulares from "../components/viagens/ViagemCadastradas";

const Home = () => {
  return (
    // Adicione esta div em cada página
    <div className="flex-grow flex flex-col justify-center items-center">
      <Carrossel />
      <ViagensPopulares />
    </div>
  );
};

export default Home;