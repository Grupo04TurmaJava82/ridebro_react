import axios from 'axios';
import type { Veiculo } from '../types/Veiculo';

const API_URL = 'https://carona-spring.onrender.com/veiculo';

export async function buscarVeiculos(): Promise<Veiculo[]> {
  const resposta = await axios.get(API_URL);
  return resposta.data;
}

export async function deletarVeiculo(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
