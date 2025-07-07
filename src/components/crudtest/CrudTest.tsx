import { useEffect, useState } from "react"
import { listar } from "../../services/Services"
import type Veiculo from "../../models/Veiculo"
import type Viagem from "../../models/Viagem"

function CrudTest() {

   const [viagens, setViagens] = useState<Viagem[]>([])
   const [veiculos, setVeiculos] = useState<Veiculo[]>([])

  async function buscarViagens() {
    await listar("/viagens", setViagens)
  }

  async function buscarVeiculos() {
    await listar("/veiculo", setVeiculos)
  }

  useEffect(() => {
    buscarViagens()
    buscarVeiculos()
  }, [])

  return (
    <div>
      <h1>Viagens</h1>
      <p>{viagens.map((viagem) => (<span>{viagem.id},{viagem.veiculo.modelo},{viagem.partida},{viagem.destino},{viagem.distancia},{viagem.tempoDeViagem} | </span>))}</p>
      <h1>Veículos</h1>
      <p>{veiculos.map((veiculo) => (<span>{veiculo.id},{veiculo.modelo},{veiculo.placa},{veiculo.ano},{veiculo.cor},{veiculo.velocidadeMedia} |</span>))}</p>
    </div>
  )
}

export default CrudTest