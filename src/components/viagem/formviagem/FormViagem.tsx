import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormularioViagem() {
  const [usuarioId, setUsuarioId] = useState("");
  const [placa, setPlaca] = useState("");
  const [partida, setPartida] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioId || !placa || !partida || !destino || !distancia) {
      // antigo -> alert("Preencha todos os campos obrigatórios.");
      // ✅ [MODIFICADO] Alerta de campos obrigatórios com SweetAlert2
      Swal.fire({
        icon: "warning",
        title: "Preencha todos os campos obrigatórios!",
        confirmButtonColor: "#1DB9FF",
      });
      return;
    }

    try {
      const veiculoResponse = await axios.get(
        `https://carona-spring.onrender.com/veiculo/placa/${placa.toUpperCase()}`
      );

      const veiculo = Array.isArray(veiculoResponse.data)
        ? veiculoResponse.data[0]
        : veiculoResponse.data;

      if (!veiculo || !veiculo.id) {
        // antigo -> alert("Veículo não encontrado.");
        // ✅ [MODIFICADO] Alerta de veículo não encontrado
        Swal.fire({
          icon: "error",
          title: "Veículo não encontrado!",
          confirmButtonColor: "#1DB9FF",
        });
        return;
      }

      const viagem = {
        usuario: { id: Number(usuarioId) },
        veiculo: { id: veiculo.id },
        partida,
        destino,
        distancia: Number(distancia),
      };

      const resposta = await axios.post(
        "https://carona-spring.onrender.com/viagens",
        viagem
      );

      // antigo -> alert("Viagem criada com sucesso!");
      console.log("Viagem criada:", resposta.data);
      // ✅ [MODIFICADO] Alerta de sucesso com SweetAlert2
      await Swal.fire({
        icon: "success",
        title: "Viagem criada com sucesso!",
        confirmButtonColor: "#1DB9FF",
      });

      navigate("/veiculo");

      // Limpar os campos
      setUsuarioId("");
      setPlaca("");
      setPartida("");
      setDestino("");
      setDistancia("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Erro ao criar viagem:", error);
      if (error.response?.data) {
        // antigo -> alert("Erro: " + JSON.stringify(error.response.data));
        // ✅ [MODIFICADO] Alerta com erro da API
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: JSON.stringify(error.response.data),
          confirmButtonColor: "#1DB9FF",
        });
      } else {
        // antigo -> alert("Erro inesperado. Verifique os dados.");
        // ✅ [MODIFICADO] Alerta de erro genérico
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
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-3xl space-y-5 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-[#1DB9FF]">
        Criar Viagem
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          ID do Usuário
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          placeholder="Digite o ID do usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
      </div>

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

      <button
        type="submit"
        className="w-full bg-[#1DB9FF] text-white font-bold py-3 rounded-lg hover:bg-[#17a0e0] transition"
      >
        Criar Viagem
      </button>
    </form>
  );
}
