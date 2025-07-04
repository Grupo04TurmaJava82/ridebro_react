import type Viagem from "./Viagem"

export default interface Usuario {
  id: number
  nome: string
  usuario: string
  senha: string
  foto: string
  viagem?: Viagem[] | null;
}