import { useEffect, useState } from 'react';
import { buscarViagens } from '../../services/viagemService';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCar } from 'react-icons/fa';

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

export default function ViagensPopulares() {
  const [viagens, setViagens] = useState<Viagem[]>([]);

  useEffect(() => {
    buscarViagens()
      .then(setViagens)
      .catch((erro) => console.error('Erro ao buscar viagens:', erro));
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Rotas Cadastradas</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {viagens.map((v) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-300 p-4 rounded-2xl border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-md transition duration-300"
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
            <p className="text-sm text-gray-700">Motorista: {v.usuario?.nome ?? 'Não informado'}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
