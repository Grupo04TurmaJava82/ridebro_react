import { useState } from "react";
import axios from "axios";

export default function FormularioViagem() {
  const [usuarioId, setUsuarioId] = useState("");
  const [placa, setPlaca] = useState("");
  const [partida, setPartida] = useState("");
  const [destino, setDestino] = useState("");
  const [distancia, setDistancia] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuarioId || !placa || !partida || !destino || !distancia) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Buscar o veículo pela placa
      const veiculoResponse = await axios.get(
        `https://carona-spring.onrender.com/veiculo/placa/${placa.toUpperCase()}`
      );

      const veiculo = Array.isArray(veiculoResponse.data)
        ? veiculoResponse.data[0]
        : veiculoResponse.data;

      if (!veiculo || !veiculo.id) {
        alert("Veículo não encontrado.");
        return;
      }

      // Montar o corpo da requisição
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

      alert("Viagem criada com sucesso!");
      console.log("Viagem criada:", resposta.data);

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
        alert("Erro: " + JSON.stringify(error.response.data));
      } else {
        alert("Erro inesperado. Verifique os dados.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Criar Viagem</h2>

      <div>
        <label className="block font-medium mb-1">ID do Usuário</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Digite o ID do usuário"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Placa do Veículo</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="ABC-1234"
          value={placa}
          onChange={(e) => setPlaca(e.target.value.toUpperCase())}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Local de Partida</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Ex: Rua das Maravilhas"
          value={partida}
          onChange={(e) => setPartida(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Destino</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Ex: Av. Paulista"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Distância (km)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Ex: 110"
          value={distancia}
          onChange={(e) => setDistancia(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#1DB9FF] text-white font-semibold py-2 rounded hover:bg-[#17a0e0] transition"
      >
        Criar Viagem
      </button>
    </form>
  );
}
