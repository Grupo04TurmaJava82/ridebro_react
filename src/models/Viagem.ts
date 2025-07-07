import type Usuario from "./Usuario"
import type Veiculo from "./Veiculo"

export default interface Viagem {
  id: number
  usuario: Usuario | null
  veiculo: Veiculo
  partida: string
  destino: string
  distancia: number
  tempoDeViagem: number
}