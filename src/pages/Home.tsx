import ViagensPopulares from "../components/viagens/ViagemCadastradas";

const Home = () => {
  return (
    // Adicione esta div em cada página
    <div className="flex-grow flex flex-col justify-center items-center">

      <ViagensPopulares />
    </div>
  );
};

export default Home;