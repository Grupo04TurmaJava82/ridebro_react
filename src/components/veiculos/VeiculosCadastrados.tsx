import { useEffect, useState } from 'react';
import { buscarVeiculos, deletarVeiculo } from '../../services/veiculoService';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaCar, FaTrash } from 'react-icons/fa';

interface Veiculo {
  id: number;
  modelo: string;
  placa: string;
  ano: number;
  cor: string;
  velocidadeMedia: number;
}

export default function CardVeiculo() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    const resposta = await buscarVeiculos();
    setVeiculos(resposta);
  };

  const excluirVeiculo = async (id: number) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    });

    if (confirmacao.isConfirmed) {
      try {
        await deletarVeiculo(id);
        toast.success('Veículo excluído com sucesso!');
        carregarVeiculos();
      } catch (erro) {
        toast.error('Erro ao excluir veículo.');
        console.error(erro);
      }
    }
  };

  return (
    
    <section className="p-6">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6">Veículos Cadastrados</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {veiculos.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-300 p-4 rounded-2xl border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaCar className="text-blue-600" />
              {v.modelo} ({v.ano})
            </h3>
            <p className="text-sm text-gray-700 mb-1">Placa: {v.placa}</p>
            <p className="text-sm text-gray-700 mb-1">Cor: {v.cor}</p>
            <p className="text-sm text-gray-700 mb-1">Velocidade Média: {v.velocidadeMedia} km/h</p>
            <button
              onClick={() => excluirVeiculo(v.id)}
              className="mt-3 flex items-center gap-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-700 transition"
            >
              <FaTrash /> Excluir
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
