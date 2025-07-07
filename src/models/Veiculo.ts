import type Viagem from "./Viagem";

export default interface Veiculo {
    id: number | undefined;
    modelo: string;
    placa: string;
    ano: number;
    cor: string;
    velocidadeMedia: number;
    viagem?: Viagem[] | null;
}