import Carrossel from "../components/carrossel/Carrossel";
import ListaViagens from "../components/viagens/listaviagens/ListaViagens";

const Home = () => {
  return (
    // Adicione esta div em cada página
    <div className="flex-grow flex flex-col justify-center items-center">
      <Carrossel />
      <ListaViagens />
    </div>
  );
};

export default Home;