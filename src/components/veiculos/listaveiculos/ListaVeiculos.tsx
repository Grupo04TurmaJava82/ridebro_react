import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom"; // <-- IMPORTANTE
import type Veiculo from "../../../models/Veiculo";
import { FaPlus } from "react-icons/fa";
import VeiculoCard from "../veiculocard/VeiculoCard";
import { listar } from "../../../services/Services";
import { GridLoader } from "react-spinners";

export default function ListaVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const carregarVeiculos = async () => {
    setIsLoading(true)
    try {
      await listar('/veiculo', setVeiculos);
    } catch(error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    carregarVeiculos();
  }, []);

  return (
    <section className="p-6 w-full">
      <ToastContainer />

      <div className="flex items-center justify-end mb-6">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold ">
          Veículos Cadastrados
        </h2>

        <Link
          to="/cadastroVeiculo"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow-md transition"
        >
          <FaPlus />
          Cadastrar Veículo
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

      {(!isLoading && veiculos.length === 0) && (
        <span className="flex my-15 text-3xl justify-center">
          Nenhum veículo foi
          encontrado
        </span>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {veiculos.map((veiculoAtual) => (
          <VeiculoCard key={veiculoAtual.id} veiculo={veiculoAtual} />
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
}
