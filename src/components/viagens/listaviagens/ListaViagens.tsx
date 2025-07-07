import { useEffect, useState } from 'react';
import { GridLoader } from 'react-spinners'
import { FaPlus } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // <-- IMPORTANTE
import type Viagem from '../../../models/Viagem';
import ViagemCard from '../viagemcard/ViagemCard';
import { ToastContainer } from 'react-toastify';
import { listar } from '../../../services/Services';

export default function ListaViagens() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const buscarViagens = async () => {
    setIsLoading(true)
    try {
      await listar('/viagens', setViagens)
    } catch(erro) {
      console.log('Erro ao buscar viagens:', erro)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    buscarViagens();
  }, []);

  return (
    <section className="p-6 w-full">
      <div className="flex items-center justify-end mb-6">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">Rotas Cadastradas</h2>

        <Link
          to="/cadastroViagem"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow-md transition"
        >
          <FaPlus />
          Cadastrar Viagem
        </Link>
      </div>

      <div className='flex'>
        {isLoading && (
            <GridLoader
              color='#155dfc'
              margin={5}
              size={50}
              speedMultiplier={1}
              aria-label="grid-loading"
              className='mx-auto my-8'
            />
          )}
      </div>

      {(!isLoading && viagens.length === 0) && (
        <span className="flex my-15 text-3xl justify-center">
          Nenhuma viagem foi
          encontrada
        </span>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {viagens.map((viagemAtual) => (
          <ViagemCard key={viagemAtual.id} viagem={viagemAtual}></ViagemCard>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
