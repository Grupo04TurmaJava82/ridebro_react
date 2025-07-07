import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { FaCar, FaTrash, FaPlus, FaEdit } from 'react-icons/fa'; // [ADICIONADO]
import { Link, useNavigate } from 'react-router-dom'; // [ADICIONADO]
import { buscarVeiculos, deletarVeiculo } from '../../../services/veiculoService';

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
  const navigate = useNavigate(); // [ADICIONADO]

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

      <div className="relative flex items-center justify-end mb-6">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">Veículos Cadastrados</h2>

        <Link
          to="/cadastroVeiculo"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow-md transition"
        >
          <FaPlus />
          Cadastrar Veículo
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {veiculos.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-300 p-4 rounded-2xl border-3 border-transparent hover:border-cyan-500 shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaCar className="text-blue-600" />
              {v.modelo} ({v.ano})
            </h3>
            <p className="text-sm text-gray-700 mb-1">Placa: {v.placa}</p>
            <p className="text-sm text-gray-700 mb-1">Cor: {v.cor}</p>
            <p className="text-sm text-gray-700 mb-1">Velocidade Média: {v.velocidadeMedia} km/h</p>

            {/* AÇÕES */}
            <div className="flex gap-2 mt-3"> {/* [ADICIONADO] */}
              <button
                onClick={() => navigate(`/editarveiculo/${v.id}`)} // [ADICIONADO]
                className="flex items-center gap-2 px-3 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition"
              >
                <FaEdit /> Editar
              </button>

              <button
                onClick={() => excluirVeiculo(v.id)}
                className="flex items-center gap-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition"
              >
                <FaTrash /> Excluir
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
