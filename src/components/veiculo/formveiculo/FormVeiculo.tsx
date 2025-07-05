import { useState } from "react";
import axios from "axios";

export default function FormVeiculo() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [velocidadeMedia, setVelocidadeMedia] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modelo || !placa || !ano || !cor || !velocidadeMedia) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novoVeiculo = {
      modelo,
      placa,
      ano: parseInt(ano),
      cor,
      velocidadeMedia: parseFloat(velocidadeMedia),
    };

    try {
      const resposta = await axios.post(
        "https://carona-spring.onrender.com/veiculo",
        novoVeiculo
      );

      console.log("Veículo cadastrado com sucesso:", resposta.data);
      alert("Veículo cadastrado com sucesso!");

      // Limpar os campos
      setModelo("");
      setPlaca("");
      setAno("");
      setCor("");
      setVelocidadeMedia("");
    } catch (erro) {
      console.error("Erro ao cadastrar veículo:", erro);
      alert("Erro ao cadastrar veículo. Verifique os dados e tente novamente.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Cadastrar Veículo</h2>

      <div>
        <label className="block font-medium mb-1">Modelo</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          placeholder="Ex: Volkswagen Gol"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Placa</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          placeholder="Ex: ABC-1234"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Ano</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Ex: 2022"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Cor</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          placeholder="Ex: Preto"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Velocidade Média (km/h)
        </label>
        <input
          type="number"
          step="0.1"
          className="w-full p-2 border rounded"
          value={velocidadeMedia}
          onChange={(e) => setVelocidadeMedia(e.target.value)}
          placeholder="Ex: 60"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#1DB9FF] text-white font-semibold py-2 rounded hover:bg-[#17a0e0] transition"
      >
        Cadastrar Veículo
      </button>
    </form>
  );
}
