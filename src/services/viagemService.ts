import axios from 'axios';
import type Viagem from '../models/Viagem';

const API_URL = 'https://carona-spring.onrender.com/viagens';

// Função original, agora com tipagem
export async function buscarViagens(): Promise<Viagem[]> { // [EDITADO] - Adicionado tipo de retorno
  const resposta = await axios.get(API_URL);
  return resposta.data;
}

// [CRIADO] - Buscar uma viagem por ID (necessário para a página de edição)
export async function buscarViagemPorId(id: number): Promise<Viagem> {
  const resposta = await axios.get(`${API_URL}/${id}`);
  return resposta.data;
}

// [CRIADO] - Cadastrar nova viagem (para consistência)
export async function cadastrarViagem(viagem: Omit<Viagem, 'id'>): Promise<void> {
  await axios.post(API_URL, viagem);
}

// [CRIADO] - Atualizar viagem existente (essencial para salvar a edição)
export async function atualizarViagem(id: number, viagem: Partial<Viagem>): Promise<void> {
  await axios.put(`${API_URL}/${id}`, viagem);
}

// [CRIADO] - Deletar viagem (para centralizar a lógica que estava no componente)
export async function deletarViagem(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}