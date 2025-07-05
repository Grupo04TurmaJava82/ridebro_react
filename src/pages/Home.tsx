import ViagensPopulares from "../components/viagens/ViagemCadastradas";

const Home = () => {
  return (
    // Adicione esta div em cada página
    <div className="flex-grow flex flex-col justify-center items-center">
      <h1 className="text-2xl">Página Home</h1>
      <p>Bem-vindo ao RideBro!</p>
      <ViagensPopulares />
    </div>
  );
};

export default Home;