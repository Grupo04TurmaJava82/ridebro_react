import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // <-- Adicionado para pegar o ID na edição
import Swal from "sweetalert2";

export default function FormVeiculo() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [velocidadeMedia, setVelocidadeMedia] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // <-- Pegando o ID da URL, se houver

  // 🔄 Carrega os dados do veículo existente se for edição
  useEffect(() => {
    if (id) {
      axios
        .get(`https://carona-spring.onrender.com/veiculo/${id}`)
        .then((res) => {
          const v = res.data;
          setModelo(v.modelo);
          setPlaca(v.placa);
          setAno(v.ano.toString());
          setCor(v.cor);
          setVelocidadeMedia(v.velocidadeMedia.toString());
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: "Não foi possível carregar os dados do veículo.",
            confirmButtonColor: "#1DB9FF",
          });
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modelo || !placa || !ano || !cor || !velocidadeMedia) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha todos os campos antes de continuar.",
        confirmButtonColor: "#1DB9FF",
      });
      return;
    }

    const veiculoData = {
       id: parseInt(id!),
      modelo,
      placa,
      ano: parseInt(ano),
      cor,
      velocidadeMedia: parseFloat(velocidadeMedia),
    };

    try {
      if (id) {
        // 🔁 Se tiver ID, é edição
        await axios.put(
          `https://carona-spring.onrender.com/veiculo`,
          veiculoData
        );
        await Swal.fire({
          icon: "success",
          title: "Alterações salvas!",
          text: "Veículo atualizado com sucesso.",
          confirmButtonColor: "#1DB9FF",
        });
      } else {
        // ➕ Cadastro novo
        await axios.post(
          "https://carona-spring.onrender.com/veiculo",
          veiculoData
        );
        await Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Veículo cadastrado com sucesso!",
          confirmButtonColor: "#1DB9FF",
        });
      }

      navigate("/veiculo");

      // Limpar os campos após cadastro
      setModelo("");
      setPlaca("");
      setAno("");
      setCor("");
      setVelocidadeMedia("");
    } catch (erro) {
      console.error("Erro ao salvar veículo:", erro);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Verifique os dados e tente novamente.",
        confirmButtonColor: "#1DB9FF",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-3xl space-y-5 border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-[#1DB9FF]">
        {id ? "Editar Veículo" : "Cadastrar Veículo"}
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
        {id ? "Salvar Alterações" : "Cadastrar Veículo"}
      </button>
    </form>
  );
}
