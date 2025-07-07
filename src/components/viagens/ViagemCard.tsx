import { FaArrowRight, FaChevronRight } from 'react-icons/fa';

interface RotaInfo {
  de: string;
  para: string;
  preco: string;
  urlImagem: string;
}

interface RotaRelacionada {
  de: string;
  preco: string;
}

interface ViagemCardProps {
  rotaPrincipal: RotaInfo;
  rotasRelacionadas: RotaRelacionada[];
}

const ViagemCard = ({ rotaPrincipal, rotasRelacionadas }: ViagemCardProps) => {
  return (
    // Card principal
    <div className="bg-white rounded-lg shadow-md border border-gray-200 min-w-[320px] flex-shrink-0">

      {/* --- Seção da Rota Principal --- */}
      <div className="relative">
        <img src={rotaPrincipal.urlImagem} alt={`Viagem para ${rotaPrincipal.para}`} className="w-full h-40 object-cover rounded-t-lg" />
      </div>

      <div className="p-1">
        {/* Título da Rota */}
        <h3 className="text-xg font-bold text-gray-800 flex items-center gap-2">
          {rotaPrincipal.de} <FaArrowRight size={16} className="text-gray-500" /> {rotaPrincipal.para}
        </h3>

        {/* Preço Principal */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-xs text-gray-500">A partir de</p>
            <p className="text-2xl font-bold text-cyan-500">
              R$ <span className="text-3xl">{rotaPrincipal.preco}</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Seção de Rotas Relacionadas --- */}
      <div className="border-t border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-600 mb-3">
          Para {rotaPrincipal.para} saindo de
        </p>
        <ul className="space-y-2">
          {rotasRelacionadas.map((rota, index) => (
            <li key={index} className="flex justify-between items-center text-gray-700">
              <span>{rota.de}</span>
              <a href="#" className="flex items-center gap-2 font-bold text-gray-800 hover:text-cyan-500">
                R$ {rota.preco}
                <FaChevronRight size={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViagemCard;