import axios from 'axios';
import type { Veiculo } from '../types/Veiculo';

const API_URL = 'https://carona-spring.onrender.com/veiculo';

// Buscar todos os veículos
export async function buscarVeiculos(): Promise<Veiculo[]> {
  const resposta = await axios.get(API_URL);
  return resposta.data;
}

// Buscar um veículo por ID (usado na edição)
export async function buscarVeiculoPorId(id: number): Promise<Veiculo> {
  const resposta = await axios.get(`${API_URL}/${id}`);
  return resposta.data;
}

// Cadastrar novo veículo
export async function cadastrarVeiculo(veiculo: Omit<Veiculo, 'id'>): Promise<void> {
  await axios.post(API_URL, veiculo);
}

// Atualizar veículo existente (usado na edição)
export async function atualizarVeiculo(id: number, veiculo: Partial<Veiculo>): Promise<void> {
  await axios.put(`${API_URL}/${id}`, veiculo);
}

// Deletar veículo
export async function deletarVeiculo(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
