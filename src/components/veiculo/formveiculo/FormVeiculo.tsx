import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function FormVeiculo() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [velocidadeMedia, setVelocidadeMedia] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modelo || !placa || !ano || !cor || !velocidadeMedia) {
      // antigo -> alert("Preencha todos os campos obrigatórios.");
      // ✅ [MODIFICADO] Substituído alert por SweetAlert2
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos antes de continuar.",
        confirmButtonColor: "#1DB9FF"
      });
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
      // antigo -> alert("Veículo cadastrado com sucesso!");
      // ✅ [MODIFICADO] Alerta de sucesso com SweetAlert2
      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Veículo cadastrado com sucesso!",
        confirmButtonColor: "#1DB9FF"
      });

      navigate("/veiculo");

      // Limpar os campos
      setModelo("");
      setPlaca("");
      setAno("");
      setCor("");
      setVelocidadeMedia("");
    } catch (erro) {
      console.error("Erro ao cadastrar veículo:", erro);
      // antigo -> alert("Erro ao cadastrar veículo. Verifique os dados e tente novamente.");
      // ✅ [MODIFICADO] Alerta de erro com SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Erro ao cadastrar",
        text: "Verifique os dados e tente novamente.",
        confirmButtonColor: "#1DB9FF"
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-3xl space-y-5 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-[#1DB9FF]">
        Cadastrar Veículo
      </h2>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Modelo</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          placeholder="Ex: Volkswagen Gol"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Placa</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          value={placa}
          onChange={(e) => setPlaca(e.target.value)}
          placeholder="Ex: ABC-1234"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Ano</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Ex: 2022"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Cor</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          placeholder="Ex: Preto"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Velocidade Média (km/h)
        </label>
        <input
          type="number"
          step="0.1"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB9FF] placeholder-gray-400 transition"
          value={velocidadeMedia}
          onChange={(e) => setVelocidadeMedia(e.target.value)}
          placeholder="Ex: 60"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#1DB9FF] text-white font-bold py-3 rounded-lg hover:bg-[#17a0e0] transition"
      >
        Cadastrar Veículo
      </button>
    </form>
  );
}
