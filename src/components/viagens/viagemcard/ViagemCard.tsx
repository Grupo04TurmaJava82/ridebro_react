import { motion } from 'framer-motion';
import { FaCar, FaClock, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import type Viagem from '../../../models/Viagem';
import { deletar } from '../../../services/Services';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

interface ViagemCardProps {
  viagem: Viagem
}

const ViagemCard = ({ viagem }: ViagemCardProps) => {

  const handleExcluirViagem = async (id: number) => {
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
        await deletar(`/viagens/${id}`);
        toast.success('Viagem excluída com sucesso!');
      } catch (erro) {
        console.error('Erro ao excluir viagem:', erro);
        toast.error('Erro ao excluir. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <motion.div
      key={viagem.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-300 p-4 rounded-2xl border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-md transition duration-300"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
        <FaMapMarkerAlt className="text-blue-600" />
        {viagem.partida} → {viagem.destino}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        <FaClock className="inline mr-1" />
        Tempo estimado: {viagem.tempoDeViagem} min
      </p>
      <p className="text-sm text-gray-600 mb-1">
        Distância: {viagem.distancia} km
      </p>
      <p className="text-sm mt-2">
        <FaCar className="inline mr-1 text-gray-500" />
        Veículo: {viagem.veiculo?.modelo ?? 'Não informado'}
      </p>
      <p className="text-sm text-gray-700 mb-4">
        Motorista: {viagem.usuario?.nome ?? 'Não informado'}
      </p>

      <button
        className="bg-red-700 hover:bg-red-700 text-white text-sm px-3 py-1 rounded flex items-center gap-2"
        onClick={() => handleExcluirViagem(viagem.id)}
      >
        <FaTrash /> Excluir
      </button>
    </motion.div>
  );
};

export default ViagemCard;
