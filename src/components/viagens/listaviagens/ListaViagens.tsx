import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCar, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
// [EDITADO] - Importando as funções de buscar e deletar do service
import { buscarViagens, deletarViagem } from '../../../services/viagemService';

// Essas interfaces podem ser movidas para um arquivo types/Viagem.ts
interface Usuario {
  nome: string;
}

interface Veiculo {
  modelo: string;
}

interface Viagem {
  id: number;
  partida: string;
  destino: string;
  distancia: number;
  tempoDeViagem: number;
  usuario: Usuario | null;
  veiculo: Veiculo | null;
}

// [EDITADO] - Renomeado o componente para refletir melhor seu propósito
export default function ViagensCadastradas() {
  const [viagens, setViagens] = useState<Viagem[]>([]);
  const navigate = useNavigate();

  // [CRIADO] - Função para carregar as viagens, seguindo o padrão do componente de veículos
  const carregarViagens = async () => {
    try {
      const resposta = await buscarViagens();
      setViagens(resposta);
    } catch (erro) {
      console.error('Erro ao buscar viagens:', erro);
      toast.error('Falha ao carregar as viagens.');
    }
  };

  useEffect(() => {
    carregarViagens(); // [EDITADO] - Chamando a nova função de carregamento
  }, []);

  // [EDITADO] - A função de exclusão agora usa o service e recarrega a lista
  const excluirViagem = async (id: number) => {
    const resultado = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) {
      try {
        await deletarViagem(id); // [EDITADO] - Usando a função do service
        toast.success('Viagem excluída com sucesso!');
        carregarViagens(); // [EDITADO] - Recarrega a lista para refletir a exclusão
      } catch (erro) {
        console.error('Erro ao excluir viagem:', erro);
        toast.error('Erro ao excluir. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <section className="p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative flex items-center justify-end mb-6">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">Rotas Cadastradas</h2>

        <Link
          to="/cadastroViagem"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded flex items-center gap-2 shadow-md transition"
        >
          <FaPlus />
          Cadastrar Viagem
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {viagens.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-300 p-4 rounded-2xl border-3 border-transparent hover:border-cyan-500 shadow-sm hover:shadow-md transition duration-300"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="text-blue-600" />
              {v.partida} → {v.destino}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              <FaClock className="inline mr-1" />
              Tempo estimado: {v.tempoDeViagem} min
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Distância: {v.distancia} km
            </p>
            <p className="text-sm mt-2">
              <FaCar className="inline mr-1 text-gray-500" />
              Veículo: {v.veiculo?.modelo ?? 'Não informado'}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Motorista: {v.usuario?.nome ?? 'Não informado'}
            </p>

            {/* Botões de ação */}
            <div className="flex gap-2">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-3 py-1 rounded flex items-center gap-2"
                onClick={() => navigate(`/editarviagem/${v.id}`)}
              >
                <FaEdit /> Editar
              </button>

              <button
                className="bg-red-700 hover:bg-red-800 text-white text-sm px-3 py-1 rounded flex items-center gap-2"
                onClick={() => excluirViagem(v.id)} // [EDITADO] - Chamando a nova função com nome padronizado
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