import * as enums from '../utils/enum/tarefa'

class Tarefa {
  titulo: string
  status: enums.Status
  prioridade: enums.Prioridade
  descricao: string
  id: number

  constructor(
    titulo: string,
    status: enums.Status,
    prioridade: enums.Prioridade,
    descricao: string,
    id: number
  ) {
    this.titulo = titulo
    this.descricao = descricao
    this.id = id
    this.status = status
    this.prioridade = prioridade
  }
}

export default Tarefa
