// [MODIFICADO] - Adicionado useEffect e useParams
import { useState, useEffect } from "react";
import axios from "axios";
// [MODIFICADO] - Adicionado useParams
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// [MODIFICADO] - Renomeado para consistência
export default function FormViagem() {
  const [usuarioId, setUsuarioId] = useState("");
  const [placa, setPlaca] = useState("");
  const [partida, setPartida] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState("");

  const navigate = useNavigate();
  // [CRIADO] - Pegando o ID da URL, exatamente como no FormVeiculo
  const { id } = useParams();

  // [CRIADO] - Bloco useEffect para carregar os dados da viagem se for edição
  useEffect(() => {
    if (id) {
      axios
        .get(`https://carona-spring.onrender.com/viagens/${id}`)
        .then((res) => {
          const v = res.data;
          // Preenche os campos do formulário com os dados recebidos
          setUsuarioId(v.usuario.id.toString());
          setPlaca(v.veiculo.placa);
          setPartida(v.partida);
          setDestino(v.destino);
          setDistancia(v.distancia.toString());
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Não foi possível carregar os dados da viagem.",
            confirmButtonColor: "#1DB9FF",
          });
        });
    }
  }, [id]); // Este efeito depende do ID, e só roda quando ele muda

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioId || !placa || !partida || !destino || !distancia) {
      Swal.fire({
        icon: "warning",
        title: "Preencha todos os campos obrigatórios!",
        confirmButtonColor: "#1DB9FF",
      });
      return;
    }

    try {
      // A lógica para buscar o veículo pela placa é necessária tanto na criação
      // quanto na edição, caso o usuário altere a placa.
      const veiculoResponse = await axios.get(
        `https://carona-spring.onrender.com/veiculo/placa/${placa.toUpperCase()}`
      );

      const veiculo = Array.isArray(veiculoResponse.data)
        ? veiculoResponse.data[0]
        : veiculoResponse.data;

      if (!veiculo || !veiculo.id) {
        Swal.fire({
          icon: "error",
          title: "Veículo não encontrado!",
          confirmButtonColor: "#1DB9FF",
        });
        return;
      }

      // [MODIFICADO] - A estrutura do objeto agora é condicional
      // Se for edição, inclui o ID da viagem
      const viagemData = {
        ...(id && { id: Number(id) }), // Adiciona o ID da viagem se estiver editando
        usuario: { id: Number(usuarioId) },
        veiculo: { id: veiculo.id },
        partida,
        destino,
        distancia: Number(distancia),
      };

      // [MODIFICADO] - Lógica condicional para PUT (editar) ou POST (criar)
      if (id) {
        // Se tem ID, é edição (PUT)
        await axios.put(
          "https://carona-spring.onrender.com/viagens",
          viagemData
        );
        await Swal.fire({
          icon: "success",
          title: "Alterações salvas!",
          text: "Viagem atualizada com sucesso.",
          confirmButtonColor: "#1DB9FF",
        });
      } else {
        // Se não tem ID, é cadastro novo (POST)
        await axios.post(
          "https://carona-spring.onrender.com/viagens",
          viagemData
        );
        await Swal.fire({
          icon: "success",
          title: "Viagem criada com sucesso!",
          confirmButtonColor: "#1DB9FF",
        });
      }

      // [MODIFICADO] - Navega para a lista de VIAGENS, não de veículos
      navigate("/viagem");

      // Limpar os campos (opcional, mas bom manter)
      setUsuarioId("");
      setPlaca("");
      setPartida("");
      setDestino("");
      setDistancia("");
    } catch (error: any) {
      console.error("Erro ao salvar viagem:", error);
      // O tratamento de erro continua o mesmo
      if (error.response?.data) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: JSON.stringify(error.response.data),
          confirmButtonColor: "#1DB9FF",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro inesperado",
          text: "Verifique os dados e tente novamente.",
          confirmButtonColor: "#1DB9FF",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 p-8 bg-white shadow-lg rounded-3xl space-y-5 border border-gray-100"
    >
      {/* [MODIFICADO] - Título dinâmico */}
      <h2 className="text-3xl font-bold text-center text-[#1DB9FF]">
        {id ? "Editar Viagem" : "Criar Viagem"}
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Placa do Veículo
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          placeholder="ABC-1234"
          value={placa}
          onChange={(e) => setPlaca(e.target.value.toUpperCase())}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Local de Partida
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          placeholder="Ex: Rua das Maravilhas"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Destino</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          placeholder="Ex: Av. Paulista"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Distância (km)
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          placeholder="Ex: 110"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
        />
      </div>

      {/* [MODIFICADO] - Texto do botão dinâmico */}
      <button
        type="submit"
        className="w-full bg-[#1DB9FF] text-white font-bold py-3 rounded-lg hover:bg-[#17a0e0] transition"
      >
        {id ? "Salvar Alterações" : "Criar Viagem"}
      </button>
    </form>
  );
}