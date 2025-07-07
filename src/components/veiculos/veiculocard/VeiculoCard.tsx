import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaCar, FaTrash } from "react-icons/fa";
import type Veiculo from "../../../models/Veiculo";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deletar } from "../../../services/Services";

interface CardVeiculoProps {
  veiculo: Veiculo
}

export default function VeiculoCard({ veiculo }: CardVeiculoProps) {
  
  const excluirVeiculo = async (id: number) => {
    const confirmacao = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirmacao.isConfirmed) {
      try {
        await deletar(`veiculo/${id}`);
        toast.success("Veículo excluído com sucesso!");
      } catch (erro) {
        toast.error("Erro ao excluir veículo.");
        console.error(erro);
      }
    }
  };

  return (
    <motion.div
      key={veiculo.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-300 p-4 rounded-2xl border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-md transition duration-300"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
        <FaCar className="text-blue-600" />
        {veiculo.modelo} ({veiculo.ano})
      </h3>
      <p className="text-sm text-gray-700 mb-1">Placa: {veiculo.placa}</p>
      <p className="text-sm text-gray-700 mb-1">Cor: {veiculo.cor}</p>
      <p className="text-sm text-gray-700 mb-1">
        Velocidade Média: {veiculo.velocidadeMedia} km/h
      </p>
      <button
        onClick={() => excluirVeiculo(veiculo.id)}
        className="mt-3 flex items-center gap-2 px-3 py-1 bg-red-700 text-white rounded hover:bg-red-700 transition"
      >
        <FaTrash /> Excluir
      </button>
    </motion.div>
  );
}
